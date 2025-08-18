export const User = async () => {
    try {

        const response = await fetch("http://localhost:5000/api/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") || "",
            },
        })
        if (response) {
            const userData = await response.json();
            console.log("User data:", userData);
            localStorage.setItem("user",JSON.stringify(userData));
        } else {
            console.error("Failed to fetch user data");
        }
    } catch (error) {
        console.log(error)
    }
}