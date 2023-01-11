import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

import StudentCard from './StudentCard';
import { getStudents } from '../services/students.service';
import styles from './styles/Students.module.css'

export default function Students() {
  const { status, data: { user: { accessToken } } } = useSession({ required: true }) as any;

  const [data, setData] = useState({ loading: true, students: [], error: null });

  const [filterStudents, setFilterStudents] = useState([] as any)

  const filterBySearch = (e: any) => {
    const updatedList = [...data.students];
    const search = e.target.value;

    const filtered = updatedList.filter((student: any) => student.idNumber.toLowerCase().includes(search.toLowerCase()))
    setFilterStudents(filtered);
  }

  useEffect(() => {

    setData(prev => ({ ...prev, loading: true }));

    getStudents(accessToken).then((data) => {
      setData(prev => ({ ...prev, students: data }));
      setFilterStudents([...data])
    }).catch(err => setData(prev => ({ ...prev, error: err })))
      .finally(() => setData(prev => ({ ...prev, loading: false })))

  }, [accessToken])

  return (
    <>

      <div className={styles.wrap}>
        <div className={styles.search}>
          <input type="text" className={styles.searchTerm} placeholder="Search by Id Number" onChange={filterBySearch} />
        </div>
      </div>

      {/* <div className="search-header">
        <div className="search-text">Search by IdNumber:</div>
        <input id="search-box" onChange={filterBySearch} />
      </div> */}

      {!data.loading && filterStudents.map((student: any) => {
        return <StudentCard key={`${student._id}`} userData={student} />
      })}

      {data.error && (
        <div>Error</div>
      )}
    </>
  )
}
