export async function getData() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
