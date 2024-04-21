import { Profile, QueryOption } from "../models/Model";

class StorageService {
    private key = "SLEEP_MONITOR_DATA_KEY";
    
    async save(profile: Profile) {
        let profiles = await this.getAll();
        profiles = profiles.filter(item => 
            item.name.toLowerCase() !== profile.name.toLowerCase() && 
            item.gender !== profile.gender);

        const data = JSON.stringify([...profiles, profile]);
        await localStorage.setItem(this.key, data);
    }

    get(profile: Profile): Promise<Profile | null> {
        try {
            const data = localStorage.getItem(this.key);
            if (data) {
                const profiles = JSON.parse(data);
                const userprofile = profiles.find((item: Profile) => {
                    return item.name.toLowerCase() === profile.name.toLowerCase() &&
                     item.gender === profile.gender
                });
                return Promise.resolve(userprofile);
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.reject('Something went wrong');
        }
    }
    
    getAll(query: QueryOption = null): Promise<Array<Profile>> {
        try {
            const data = localStorage.getItem(this.key);
            
            if (data) {
                const results = JSON.parse(data);
                let filteredResults = results;
                if(query) {
                    let searchedDate = new Date();
                    if(query.days) {
                        searchedDate.setDate(searchedDate.getDate() - query.days);
                    }
                    
                    filteredResults = results.map((result: Profile) => {
                        result.durations = result.durations.filter(duration => {
                            if(query.days) {
                                return new Date(duration.date) >= searchedDate;
                            }
                            return true;
                        });
                            
                        if(query.order === 'desc') {
                            result.durations.sort((a, b) => 
                                (new Date(a.date)).getTime() - (new Date(b.date)).getTime());
                        }else {
                            result.durations.sort((a, b) => 
                                (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
                        }
                        return result;
                    });
                }
                return Promise.resolve(filteredResults);
            }
            return Promise.resolve([]);
        } catch (error) {
            return Promise.reject('Something went wrong');
        }
    }
}

const storageService = new StorageService();
export default storageService;