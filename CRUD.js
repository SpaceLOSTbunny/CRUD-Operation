  let tbody = document.getElementById("tbody");
  let depends = null;
  let data = [
    { name: "Arka", age: 25, sub1: 50, sub2: 60, total: 110 },
    { name: "Junid", age: 24, sub1: 40, sub2: 60, total: 100 }
  ];

  function showToast(msg, type) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.className = "show " + type;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.className = ""; }, 2400);
  }

  function readdata() {
    tbody.innerHTML = "";
    const empty = document.getElementById("empty");
    const count = document.getElementById("record-count");
    count.textContent = data.length + " record" + (data.length !== 1 ? "s" : "");

    if (data.length === 0) { empty.style.display = "block"; return; }
    empty.style.display = "none";

    data.forEach((e, i) => {
      const pct = Math.round((e.total / 200) * 100);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${escHtml(e.name)}</td>
        <td>${e.age}</td>
        <td>${e.sub1}</td>
        <td>${e.sub2}</td>
        <td>${e.total}</td>
        <td>${pct}%</td>
        <td><button class="btn-edit" onclick="updateData(${i})">Edit</button></td>
        <td><button class="btn-del" onclick="deleteData(${i})">Del</button></td>`;
      tbody.append(tr);
    });
  }

  function escHtml(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  readdata();

  function deleteData(i) {
    if (window.confirm(`Remove "${data[i].name}"?`)) {
      data.splice(i, 1);
      readdata();
      showToast("Student removed", "delete");
    }
  }

  function updateData(i) {
    document.getElementById("i1").value = data[i].name;
    document.getElementById("i2").value = data[i].age;
    document.getElementById("i3").value = data[i].sub1;
    document.getElementById("i4").value = data[i].sub2;
    document.getElementById("btn").textContent = "Save changes";
    document.getElementById("form-heading").textContent = "Editing record";
    const pill = document.getElementById("mode-pill");
    pill.textContent = "UPDATE";
    pill.className = "mode-pill update";
    document.getElementById("btn-cancel").classList.add("visible");
    depends = i;
    document.getElementById("i1").focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    document.getElementById("btn").textContent = "Add student";
    document.getElementById("form-heading").textContent = "New entry";
    const pill = document.getElementById("mode-pill");
    pill.textContent = "INSERT";
    pill.className = "mode-pill";
    document.getElementById("btn-cancel").classList.remove("visible");
    depends = null;
  }

  document.getElementById("btn-cancel").addEventListener("click", () => {
    document.getElementById("form").reset();
    resetForm();
  });

  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("i1").value.trim();
    const age  = document.getElementById("i2").value.trim();
    const sub1 = Number(document.getElementById("i3").value);
    const sub2 = Number(document.getElementById("i4").value);

    if (!name || !age) return;

    const newObj = { name, age, sub1, sub2, total: sub1 + sub2 };

    if (depends == null) {
      data.push(newObj);
      showToast("Student added", "insert");
    } else {
      data[depends] = newObj;
      showToast("Record updated", "update");
      resetForm();
    }

    readdata();
    document.getElementById("form").reset();
  });
