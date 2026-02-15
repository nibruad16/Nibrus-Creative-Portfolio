// Test script to check if settings API is working
const testSettings = async () => {
    try {
        console.log('Testing GET /api/settings...')
        const getResponse = await fetch('http://localhost:3000/api/settings')
        const getData = await getResponse.json()
        console.log('GET Response:', getResponse.status, getData)

        console.log('\nTesting PUT /api/settings...')
        const putResponse = await fetch('http://localhost:3000/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                site_title: 'Test Title',
                hero_title: 'Test Hero Title'
            })
        })
        const putData = await putResponse.json()
        console.log('PUT Response:', putResponse.status, putData)
    } catch (error) {
        console.error('Error:', error)
    }
}

testSettings()
