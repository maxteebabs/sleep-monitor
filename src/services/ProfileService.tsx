import { Profile } from "../models/Model";
import storageService from "./StorageService";

class ProfileService {
    async fetchData() {
        return storageService.getAll({ order: 'desc', days: 7 });
    }

    async register(data: Profile) {
        try {
            const existing = await storageService.get(data);
            await this.validateInputs(data, existing);

            if (existing) {
                data.durations = [...existing.durations, ...data.durations]
            }
            return storageService.save(data);
        } catch (error) {
            return Promise.reject(error);
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