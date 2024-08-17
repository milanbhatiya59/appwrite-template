const conf = {
    appWriteProjectID: String(process.env.APPWRITE_PROJECT_ID),
    appWriteURL: String(process.env.APPWRITE_URL),
    appWriteDatabaseID: String(process.env.APPWRITE_DATABASE_ID),
    appWriteCollectionID: String(process.env.APPWRITE_COLLECTION_ID),
    appWriteBucketID: String(process.env.APPWRITE_BUCKET_ID),
}

export default conf;