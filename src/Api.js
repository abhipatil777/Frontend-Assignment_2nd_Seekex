let url = "https://gorest.co.in/public/v2/users";
const header = {
    Authorization: "Bearer d0ca7466dbd069ab1a8e5da7e1ddaaf32c1f8b11ca488dd8975ca430f442cce6",
    Accept: 'application/json',
}
export async function getAllUsers() {
    const allUserData = await fetch(`${url}?page=1&per_page=20`, {
        method: 'GET',
        headers: header
    })
        .then(resp => resp.json())
        .then(data => { return data })
        .catch(error => { return error });

    return await allUserData;
}

export async function UpdateAndCreateUsers(data) {
    debugger;
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('gender', data.gender);
    formData.append('status', data.status);
    let methods = 'POST';
    let newUrl = url;
    if (data.id) {
        newUrl = `${url}/${data.id}`;
        methods = 'PATCH';
    }
    const updateUserData = await fetch(newUrl, {
        method: methods,
        headers: header,
        body: formData
    })
        .then(resp => resp.json())
        .then(data => { return data })
        .catch(error => { return error });

    return await updateUserData;
}

export async function deleteUser(id) {
    const deletedUser = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: header,
    })
        .then(resp => resp.json())
        .then(data => { return data })
        .catch(error => { return error });

    return await deletedUser;
}