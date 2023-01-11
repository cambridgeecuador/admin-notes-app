import React from 'react'

import StudentCardInput from './StudentCardInput'
import styles from './styles/Students.module.css'

export default function StudentDetails({ details, handleChange, handleFile, handleDownloadPDF }: any) {
  return (
    <div className={styles.dataContainer}>
      <h2>Details</h2>
      <StudentCardInput title='Result' name='result' type='text' value={details?.result || ''} onChange={handleChange} />

      <StudentCardInput title='Qualification' name='qualification' type='text' value={details?.qualification || ''} onChange={handleChange} />

      <StudentCardInput title='Overall Score' name='overallScore' type='number' value={details?.overallScore || ''} onChange={handleChange} />

      <StudentCardInput title='PDF' name='pdf' type='file' onChange={handleFile} />

      <button className={`${styles.button}  ${styles['bg-gray']}`} onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
  )
}
