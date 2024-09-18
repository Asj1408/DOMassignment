const studentForm = document.getElementById('studentForm');
const studentTableBody = document.querySelector('#studentTable tbody');
let students = JSON.parse(localStorage.getItem('students')) || [];


function renderStudents() {
    studentTableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td><button onclick="editStudent(${index})">Edit</button></td>
                <td><button onclick="deleteStudent(${index})">Delete</button></td>
            </tr>
        `;
        studentTableBody.insertAdjacentHTML('beforeend', row);
    });
}


function validateInputs(name, email) {
    const nameRegex = /^[A-Za-z\s]+$/; // This includes only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // This implements Basic email validation

    if (!nameRegex.test(name)) {
        alert('Student name must contain only letters!!.');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return false;
    }

    return true; 
}

// add student info
document.getElementById('addStudentBtn').addEventListener('click', () => {
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contactNo').value;

    // Validate inputs
    if (name && id && email && contact) {
        if (validateInputs(name, email)) {
            students.push({ name, id, email, contact });
            localStorage.setItem('students', JSON.stringify(students));
            renderStudents();
            studentForm.reset();
        }
    } else {
        alert('Please fill all fields.');
    }
});

// Edit student info
function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNo').value = student.contact;

    students.splice(index, 1); // Remove the student to be edited
}

// Delete student info
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}

//loading page
renderStudents();
