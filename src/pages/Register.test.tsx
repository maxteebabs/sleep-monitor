import {promises} from "fs";
const {readFile} = promises;
import React from "react";
import {
  fireEvent,
  getAllByText,
  render,
  screen,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import profileService from '../services/ProfileService';

import {Registration} from "../pages/Register";
const {
  getAllByTestId,
  getByTestId,
  getByText
} = screen;

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'),
useNavigate: () => mockUsedNavigate,
}));
    
describe("Register", () => {
  beforeAll(async () => {
    
  });
  beforeEach(() => {
    render(<Registration />);
  });

  describe("the correct elements were rendered", () => {
    it("should have 5 input elements for registration", () => {
      expect(getByTestId("name")).toBeInTheDocument();
      expect(getByTestId("gender")).toBeInTheDocument();
      expect(getByTestId("sleepTimeDuration")).toBeInTheDocument();
      expect(getByTestId("date")).toBeInTheDocument();
      expect(getByText('Add')).toBeInTheDocument();
      expect(getByText('Save')).toBeInTheDocument();
      expect(getByText('Cancel')).toBeInTheDocument();
    });

  describe("clicking the add button", () => {
    beforeEach(() => {
        fireEvent.click(getByText('Add'));
    });
      it("should add more rows", () => {
        expect(getAllByTestId('sleepTimeDuration')).toHaveLength(2);
        expect(getAllByTestId('date')).toHaveLength(2);
      });
  });
  
  describe("clicking the add button 4 times", () => {
    beforeEach(() => {
        fireEvent.click(getByText('Add'));
        fireEvent.click(getByText('Add'));
        fireEvent.click(getByText('Add'));
        fireEvent.click(getByText('Add'));
      });
    describe("clicking the add button 4times", () => {
      it("should remove the add button", () => {
        expect(() => getByText('Add')).toThrow();
      });
      
    });
  });
  
  describe("Delete button test", () => {
    beforeEach(() => {
        fireEvent.click(getByText('Add'));
      });
    describe("clicking the add button 4times", () => {
      it("should remove the added row", () => {
        fireEvent.click(getByText('Delete'));
        expect(getAllByTestId('date')).toHaveLength(1);
      });
    });
  });
  
  describe("GoBack button test", () => {
    beforeEach(() => {
        fireEvent.click(getByText('Go back'));
      });
    describe("clicking the go back button", () => { 
      it("should navigate to the home page", () => {
        expect(mockUsedNavigate).toHaveBeenCalledWith(-1);
      });
    });
  });
  
  describe("Cancel button test", () => {
    beforeEach(() => {
        fireEvent.click(getByText('Cancel'));
      });
    describe("clicking the cancel button", () => {
      it("should navigate to the home page", () => {
        expect(mockUsedNavigate).toHaveBeenCalledWith(-1);
      });
    });
  });
  
  describe("Saving the form should submit details", () => {
    beforeEach(() => {
        profileService.register = jest.fn(() => Promise.resolve());
        mockUsedNavigate.mockClear();
        
        fireEvent.change(getByTestId("name"), {target: {value: "Test1"}});
        fireEvent.change(getByTestId("gender"), {target: {value: "Male"}});
        fireEvent.change(getByTestId("sleepTimeDuration"), {target: {value: 8 }});
        fireEvent.change(getByTestId("date"), {target: {value: "2024-04-20" }});
        fireEvent.click(getByText('Save'));
      });
    describe("clicking the save button", () => {
      it("should submit details without an error", () => {
        expect(profileService.register).toHaveBeenCalledWith({
            name: 'Test1',
            gender: 'Male',
            durations: [{ sleepTimeDuration: "8", date: '2024-04-20' }],
        });
      });
    });
  });
  
  });
});