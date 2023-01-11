import React from 'react'

import StudentCardInput from './StudentCardInput'
import styles from './styles/Students.module.css'

enum UserStatus {
  WAITING = 'WAITING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

export default function StudentInformation({ user, setStatus }: { user: any, setStatus: any }) {
  const { idNumber, name, email, status } = user;

  return (
    <div className={styles.dataContainer}>
      <h2>Information</h2>
      <StudentCardInput title='Id Number' name='idNumber' type='text' value={idNumber} onChange={() => ({})} />

      <StudentCardInput title='Name' name='name' type='text' value={name} onChange={() => ({})} />

      <StudentCardInput title='Email' name='email' type='text' value={email} onChange={() => ({})} />

      <label htmlFor="status" className={styles.label}>
        <span className={styles.dataTitle}>Status</span>
        <select name='status' value={status} onChange={setStatus} className={styles.input}>
          <option value={UserStatus.WAITING}>Waiting</option>
          <option value={UserStatus.REJECTED}>Rejected</option>
          <option value={UserStatus.ACCEPTED}>Accepted</option>
        </select>
      </label>
    </div>
  )
}
