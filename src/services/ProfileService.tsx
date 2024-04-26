import { Profile } from "../models/Model";
import instance from "./axiosInstance";

class ProfileService {
    async fetchData() {
        try{
            const results = await instance.get('/profile?order=desc&days=7');  
            return results.data;    
        }catch(error) {
            console.log(error)
            return [];
        }
    }

    async register(data: Profile) {
        try {
            return instance.post('/register', data);
            
        } catch (error) {
            return error;
        }
    }

    async validateInputs(data: Profile, existing: Profile | null) {
        const currentDateDurations = data.durations.map(duration => duration.date);

        const durationsSet = new Set(currentDateDurations);
        if (durationsSet.size !== currentDateDurations.length) {
            throw new Error(`Submission cannot contain repeated sleep dates`);
        }

        if (!existing) return Promise.resolve(null);

        const existingDateDurations = existing.durations.map(duration => duration.date);

        if (existing && existingDateDurations.length) {
            currentDateDurations.forEach((dateDuration) => {
                if (existingDateDurations.includes(dateDuration)) {
                    throw new Error(`${dateDuration} already exists `);
                }
            });
        }

        return Promise.resolve(true);
    }
}

const profileService = new ProfileService();
export default profileService;