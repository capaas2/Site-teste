async function listBuckets() {
  const url = 'https://cfqwufidvchaybqknuar.supabase.co/storage/v1/bucket';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI';
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${key}`,
        'apikey': key
      }
    });
    const data = await res.json();
    console.log('Buckets list:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error listing buckets:', err);
  }
}

listBuckets();
