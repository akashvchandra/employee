const renderTable = (d) => {
    const tbody = document.querySelector("tbody");
    let rawHtml = "";
    d.forEach((item, i) => {
        let year = 2023 - item.doj;

        rawHtml += `
            <tr>
                <td>${i + 1}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.mobile}</td>
                <td>${item.gender}</td>
                <td>${item.qualification}</td>
                <td>${item.prevexp}</td>
                <td>${item.currentexp}</td>
                <td>${item.doj}</td>
                <p>The number of experience gained in this particular company is ${year}</p>
            </tr>
        `;
    });
    tbody.innerHTML = rawHtml;
};
const post = async (data) => {
    const resp = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const sdata = await resp.json();
    console.log(sdata);

    const r = await fetch("http://localhost:3000");
    console.log(r);
    const d = await r.json();

    renderTable(d);
};

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    post(data);
});
