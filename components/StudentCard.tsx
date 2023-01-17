import React from 'react'
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';

import StudentInformation from './StudentInformation'
import StudentDetails from './StudentDetails'
import { updateStudent, updatePDF, getPDF, aproveUser, updateGrades, deleteStudent } from '../services/students.service'
import styles from './styles/Students.module.css'
import 'react-toastify/dist/ReactToastify.css';

export default function StudentCard(userData: any) {
  const { data: { user: { accessToken } } } = useSession({ required: true }) as any;

  const [user, setUser] = React.useState({ ...userData.userData });
  const [initStatus] = React.useState(user.status);
  const [initDetails] = React.useState({ ...user.details });

  const [changes, setChanges] = React.useState({});

  const notifySuccess = () => {
    toast.success('Successfully', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const notifyError = () => {
    toast.error('Error', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const handleSave = async (e: any) => {
    e.preventDefault();

    const res = await updateStudent(changes, user._id, accessToken, notifySuccess, notifyError)
    const pdfRes = await updatePDF(user.pdf, user.idNumber, accessToken, notifySuccess, notifyError)

    if (JSON.stringify(changes) !== JSON.stringify(initDetails)) {
      console.log("Changes");
      
      updateGrades(user.idNumber, accessToken, notifySuccess, notifyError)
    }

    if (user.status === initStatus) {
      return;
    }

    if (user.status === 'ACCEPTED') {
      aproveUser(user.idNumber, accessToken, notifySuccess, notifyError)
    } 
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setUser((prev: { details: any; }) => ({ ...prev, details: { ...prev.details, [name]: value } }))
    setChanges((prev: any) => ({ ...prev, details: { ...prev.details, [name]: value } }))
  }
  const handleDelete = async (e: any) => {
    e.preventDefault();

    const res = await deleteStudent(user._id, accessToken, notifySuccess, notifyError)
  }

  const setStatus = (e: any) => {
    const { value } = e.target;

    setUser((prev: any) => ({ ...prev, status: value }))
    setChanges((prev: any) => ({ ...prev, status: value }))
  }

  const handleFile = (e: any) => {
    const { files } = e.target;
    const pdf = files[0];

    setUser((prev: any) => ({ ...prev, pdf }))
  }

  const handleDownloadPDF = async () => {
    const { url, error } = await getPDF(user.idNumber, accessToken);

    if (error) {
      return notifyError();
    };

    window.open(url, '_blank');
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Student: {user.name}</h1>
        <div className={styles.cardContainer}>
          <StudentInformation user={user} setStatus={setStatus} />

          <StudentDetails details={user.details} handleChange={handleChange} handleFile={handleFile} handleDownloadPDF={handleDownloadPDF} />
        </div>
        <button className={styles.button} onClick={handleSave}>Save</button>
        <button className={`${styles.button} ${styles['bg-red']}`} onClick={handleDelete}>Delete</button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}



