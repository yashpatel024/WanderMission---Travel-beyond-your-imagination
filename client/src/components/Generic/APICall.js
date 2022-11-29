// function will handle the submission.
async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
    }).catch((error) => {
        window.alert(error);
        return;
    });

    setForm({ name: "", position: "", level: "" });
    navigate("/");
}

//fetch record
useEffect(() => {
    async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(
            `http://localhost:5000/user/${params.id.toString()}`
        );

        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const record = await response.json();
        if (!record) {
            window.alert(`Record with id ${id} not found`);
            navigate("/");
            return;
        }

        setForm(record);
    }

    fetchData();

    return;
}, [params.id, navigate]);

// This will send a post request to update the data in the database.
await fetch(`http://localhost:5000/update/${params.id}`, {
    method: "POST",
    body: JSON.stringify(editedPerson),
    headers: {
        "Content-Type": "application/json",
    },
});

// This method fetches the records from the database.
useEffect(() => {
    async function getRecords() {
        const response = await fetch(`http://localhost:5000/record/`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const records = await response.json();
        setRecords(records);
    }

    getRecords();

    return;
}, [records.length]);

// This method will delete a record
async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
}
