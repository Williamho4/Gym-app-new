import React from 'react'
import SessionTable from '../../UI/SessionTable'
import WeeklySessions from '../../UI/WeeklySessions'

function ExerciseDashboard() {
  return (
    <>
      {/* Normal Screens */}

      <section className="justify-center w-full h-[44rem] md:mt-6 lg:mt-16 hidden lg:flex">
        <div className=" w-[50%] md:w-[50%] lg:w-[50%] xl:w-[40%] flex flex-col h-[99%]">
          <div className=" w-full h-[100%] flex items-center overflow-auto">
            <SessionTable title={'Todays Session'}></SessionTable>
          </div>
          <div className=" w-full h-[100%] flex items-center overflow-auto">
            <SessionTable title={'Next Session'}></SessionTable>
          </div>
        </div>
        <div className="w-[50%] md:w-[46%] lg:w-[36%] xl:w-[32%] h-[100%] flex justify-center items-center ">
          <WeeklySessions></WeeklySessions>
        </div>
      </section>

      {/* Smaller Screens */}

      <section className="flex flex-col items-center lg:hidden mt-2 h-auto md:px-10">
        <div className=" w-[100%] flex flex-col h-[99%] space-y-6">
          <div className=" w-full h-[50%] flex items-center overflow-auto">
            <SessionTable
              title={'Todays Session'}
              session={'chest'}
            ></SessionTable>
          </div>
          <div className=" w-full h-[50%] flex items-center overflow-auto">
            <SessionTable
              title={'Next Session'}
              session={'back'}
            ></SessionTable>
          </div>
        </div>
        <div className="w-[100%] h-[50rem] flex justify-center items-center">
          <WeeklySessions></WeeklySessions>
        </div>
      </section>
    </>
  )
}

export default ExerciseDashboard
