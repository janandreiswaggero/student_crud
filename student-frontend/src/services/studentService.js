const API_BASE_URL = '/teresa/students';

/**
 * Service to handle all HTTP CRUD interactions with the Student REST API.
 */
export const studentService = {
  /**
   * Fetch all students
   * @returns {Promise<Array>}
   */
  async getAll() {
    const response = await fetch(API_BASE_URL, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch students (Status ${response.status})`);
    }

    return await response.json();
  },

  /**
   * Fetch a single student by ID
   * @param {number|string} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Student #${id} not found`);
    }

    return await response.json();
  },

  /**
   * Create a new student record
   * @param {{ firstname: string, lastname: string, course: string, section: string }} studentData
   * @returns {Promise<Object>}
   */
  async create(studentData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to create student (Status ${response.status})`);
    }

    return await response.json();
  },

  /**
   * Update an existing student record
   * @param {number|string} id
   * @param {{ firstname: string, lastname: string, course: string, section: string }} studentData
   * @returns {Promise<Object>}
   */
  async update(id, studentData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to update student #${id} (Status ${response.status})`);
    }

    return await response.json();
  },

  /**
   * Delete a student record by ID
   * @param {number|string} id
   * @returns {Promise<string>}
   */
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to delete student #${id}`);
    }

    return await response.text();
  },
};
