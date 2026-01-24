const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase URL or Service Role Key in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function initStorage() {
    console.log("Checking storage buckets...");
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error("Error listing buckets:", error);
        return;
    }

    const plotsBucket = buckets.find(b => b.name === 'plots');

    if (plotsBucket) {
        console.log("'plots' bucket exists.");
        if (!plotsBucket.public) {
            console.log("Updating 'plots' bucket to be public...");
            const { error: updateError } = await supabase.storage.updateBucket('plots', {
                public: true,
                fileSizeLimit: 5242880, // 5MB
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
            });
            if (updateError) console.error("Error updating bucket:", updateError);
            else console.log("Bucket updated to public.");
        }
    } else {
        console.log("Creating 'plots' bucket...");
        const { data, error: createError } = await supabase.storage.createBucket('plots', {
            public: true,
            fileSizeLimit: 5242880,
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
        });

        if (createError) console.error("Error creating bucket:", createError);
        else console.log("Bucket 'plots' created successfully.");
    }
}

initStorage();
