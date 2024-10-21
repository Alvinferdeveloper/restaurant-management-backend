import supabase from "../lib/supabase";
export const signedUrlResolvers = {
    Mutation: {
        getSignedUrl: async (root, args) => {
            const { data, error } = await supabase.storage
                .from('food') 
                .createSignedUploadUrl(`image/${args.filename}`);
            return error ? null : data;
        },
    }
};