import axios from "axios";

// Faculty Register
export const createFaculty = async(data) => {
    const adminid = data.get("adminId")
    const url = `http://localhost:8585/api/v1/admin/${adminid}/create-faculty`
    try {
        const response = await axios.post(url, data)
        return response
    } catch (error) {
        throw new Error(error);
    }
}

// Get Faculty By Id
export const getFacultyById = async(facultyId) => {
    const url = `http://localhost:8585/api/v1/get-faculty-by-id/${facultyId}`
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        throw new Error(error);
    }
}

// Get Faculty By Admin
export const getAllFaculty = async(aId) => {
    const url = `http://localhost:8585/api/v1/get-all-feculty/admin/${aId}`
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        throw new Error(error);
    }
}

//Delete Faculty
export const deleteFaculty = async(ids) => {
    const {aid, fid} = ids
    const url = `http://localhost:8585/api/v1/delete-faculty-byid/admin/${aid}/${fid}`
    try {
        const response = await axios.delete(url)
        return response
    } catch (error) {
        throw new Error(error);
    }
}


// Get Faculty by id
export const getFaculty = async(fid) => {
    const url = `http://localhost:8585/api/v1/get-faculty-by-id/${fid}`
    try {
        const response = await axios.get(url)
        return {
            data: response.data,
            status: response.status,
            message: response.data.message,
          };
    } catch (error) {
        throw new Error(error);
    }
}