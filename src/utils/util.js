
const  getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = now.toISOString();
    return formattedDate;
}

module.exports = {getCurrentDateTime};