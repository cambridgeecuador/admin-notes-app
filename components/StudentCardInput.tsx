import React from 'react'

import styles from './styles/Students.module.css'

export default function StudentCardInput({ title, name, type, value, onChange }: any) {
  return (
    <>
      <label htmlFor={name} className={styles.label} style={{ flexDirection: 'column' }}>
        <span className={styles.dataTitle}>{title}</span>
        <input name={name} type={type} value={value} onChange={onChange} className={styles.input} />
      </label>
    </>
  )
}
