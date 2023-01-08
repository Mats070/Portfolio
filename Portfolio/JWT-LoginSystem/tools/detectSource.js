const sourceDetection = (req)=>{
        const method = req.method;
        if (method == "POST"){
            const fullURL = req.rawHeaders[19];
            const baseURL = req.get('origin');
            const result = fullURL.replace(baseURL, "");
            return result;
        }
}

module.exports = sourceDetection;