/*this module is responsible for handling all storage operations*/
const STORAGE_KEY = 'tasktrack_assignments';

export function getAssignments() {
    try {
        const savedAssignments = localStorage.getItem(STORAGE_KEY);
        return savedAssignments ? JSON.parse(savedAssignments) : [];
    } catch (error) {
        console.error('Error retrieving assignments from localStorage:', error);
        return [];
    }
}

export function saveAssignments(assignments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}