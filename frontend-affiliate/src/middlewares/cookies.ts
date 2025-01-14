

const AccesToken = async () => {
    const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken"))
        ?.split("=")[1];
    console.log("token-accessToken", accessToken);

    return accessToken;
}

export default AccesToken;