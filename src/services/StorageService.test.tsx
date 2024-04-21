import StorageService from './StorageService';
import { GenderEnum, Profile } from '../models/Model';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('StorageService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('save method', () => {
    it('should save a profile to localStorage', async () => {
      const profile: Profile = {
        name: 'Testing',
        gender: GenderEnum.Male,
        durations: [{ sleepTimeDuration: 8, date: '2024-04-20' }],
      };

      await StorageService.save(profile);

      const storedData = JSON.parse(localStorage.getItem('SLEEP_MONITOR_DATA_KEY') || '[]');
      expect(storedData).toHaveLength(1);
      expect(storedData[0]).toEqual(profile);
    });
  });

  describe('get method', () => {
    it('should return a profile from localStorage if found', async () => {
      const profile: Profile = {
        name: 'Testing',
        gender: GenderEnum.Male,
        durations: [{ sleepTimeDuration: 8, date: '2024-04-20' }],
      };

      // Save a profile to localStorage
      localStorage.setItem('SLEEP_MONITOR_DATA_KEY', JSON.stringify([profile]));

      const retrievedProfile = await StorageService.get(profile);
      expect(retrievedProfile).toEqual(profile);
    });

    it('should return null if profile is not found in localStorage', async () => {
      const profile: Profile = {
        name: 'Testing',
        gender: GenderEnum.Male,
        durations: [{ sleepTimeDuration: 8, date: '2024-04-20' }],
      };

      const retrievedProfile = await StorageService.get(profile);
      expect(retrievedProfile).toBeNull();
    });
  });

  describe('getAll method', () => {
    it('should return an empty array if localStorage is empty', async () => {
      const profiles = await StorageService.getAll();
      expect(profiles).toHaveLength(0);
    });

    it('should return all profiles stored in localStorage', async () => {
      const storedProfiles: Profile[] = [
        {
          name: 'Testing',
          gender: GenderEnum.Male,
          durations: [{ sleepTimeDuration: 8, date: '2024-04-20' }],
        },
        {
          name: 'Jane Doe',
          gender: GenderEnum.Female,
          durations: [{ sleepTimeDuration: 7, date: '2024-04-21' }],
        },
      ];

      localStorage.setItem('SLEEP_MONITOR_DATA_KEY', JSON.stringify(storedProfiles));

      const retrievedProfiles = await StorageService.getAll();
      expect(retrievedProfiles).toEqual(storedProfiles);
    });
  });
});