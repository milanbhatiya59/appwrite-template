import conf from "../conf/conf.js"
import { Client, Storage, Query, Databases, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {

        this.client
            .setEndpoint(conf.appWriteURL)
            .setProject(conf.appWriteProjectID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug
            );
        } catch (error) {
            console.log("AppWrite Service :: getPost() :: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                queries
            );
        } catch (error) {
            console.log("AppWrite Service :: getPosts() :: ", error);
            return false;
        }
    }

    async createPost({
        title,
        slug,
        content,
        userID,
        imageURL,
        status,
    }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug,
                {
                    title, content, userID, imageURL, status
                }

            );
        } catch (error) {
            console.log("AppWrite Service :: createPost() :: ", error);
            return false;
        }
    }

    async updatePost(slug, {
        title,
        content,
        imageURL,
        status,
    }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug,
                {
                    title, content, imageURL, status
                }

            );
        } catch (error) {
            console.log("AppWrite Service :: updatePost() :: ", error);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug,
            );
            return true;
        } catch (error) {
            console.log("AppWrite Service :: deletePost() :: ", error);
            return false;
        }
    }

    // Storage

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("AppWrite Service :: createFile() :: ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketID,
                fileId
            );
        } catch (error) {
            console.log("AppWrite Service :: deleteFile() :: ", error);
            return false;
        }
    }

    getFileVPreview(fileId) {
        return this.bucket.getFileView(
            conf.appWriteBucketID,
            fileId
        ).href
    };
}

const service = new Service();

export default service; 