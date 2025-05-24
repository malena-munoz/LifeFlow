export async function IsNewUser(identifier) {
    try {
        const response = await fetch(`https://localhost:7245/api/user/${identifier}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });

        if (!response.ok) {
            return true;
        }

        const data = await response.json();

        if (data.identificador == "-1") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return true;
    }
}
