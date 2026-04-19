import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const FileService = {
    /**
     * Uploads a file to Firebase Storage and returns the download URL
     * @param file The file object to upload
     * @param path The path in storage (e.g., 'resumes/student_id.pdf')
     * @returns Promise<string> The download URL
     */
    uploadFile: async (file: File, path: string): Promise<string> => {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    },

    /**
     * Specifically for uploading student resumes
     */
    uploadResume: async (file: File, studentId: string): Promise<string> => {
        const extension = file.name.split('.').pop();
        const path = `resumes/${studentId}_${Date.now()}.${extension}`;
        return FileService.uploadFile(file, path);
    }
};
