import React, { useEffect, useState } from "react";
import { FaCopy, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import JobPost from "../../assets/JobPost.svg";
import styles from "./Editor.module.css";
function Editor() {
  const [jobs, setJobs] = useState({
    1: {
      title: "",
      introduction: "",
      role: "",
      minExperience: "",
      maxExperience: "",
      qualification: "",
      salaryRange: "",
      message: "",
      company: "",
      joblocation: "",
      selectedjobType: "",
      selectedlabel: "",
      showTitle: false,
      showRole: false,
      showIntro: false,
      showQualification: false,
      showSalaryRange: false,
      showCompany: false,
      showJobLocation: false,
      showSelectedLabel: false,
      minExperience: false,
      maxExperience: false,
    },
  });
  const [activeJobId, setActiveJobId] = useState(1);
  const [jobCount, setJobCount] = useState(1);
  const [activeJob, setActiveJob] = useState(jobs[activeJobId]);

  const [noJobsAvailable, setNoJobsAvailable] = useState(false);

  const [maxExperience, setMaxExperience] = useState(null);
  useEffect(() => {
   
    setActiveJobId(1);
    setActiveJob(jobs[1]);
  }, []);

  useEffect(() => {
    setActiveJob(jobs[activeJobId]);
  }, [activeJobId, jobs]);

  const options = Array.from({ length: 10 }, (_, i) => (
    <option key={i} value={i}>
      {i} years
    </option>
  ));
  const filteredMaxOptions = maxExperience
    ? options.filter(
        (option) => parseInt(option.value) >= activeJob.minExperience
      )
    : options;

  const jobTypeOptions = [
    { label: "Full Time", value: "full_time" },
    { label: "Part Time", value: "part_time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ];

  const labelOptions = [
    { label: "Is Remote", value: "Is Remote" },
    { label: "5 day Week", value: "5 day Week" },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJobs((prevJobs) => ({
      ...prevJobs,
      [activeJobId]: {
        ...prevJobs[activeJobId],
        [name]: value,
      },
    }));
    setActiveJob((prevActiveJob) => ({
      ...prevActiveJob,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleJobChange = (jobId) => {
    setActiveJobId(jobId);
  };

  const handleNewJob = () => {
    const newJobId = jobCount + 1;
    setJobs((prevJobs) => ({
      ...prevJobs,
      [newJobId]: {
        title: "",
        introduction: "",
        role: "",
        minExperience: "",
        maxExperience: "",
        qualification: "",
        salaryRange: "",
        message: "",
        company: "",
        joblocation: "",
        selectedjobType: "",
        selectedlabel: "",
      },
    }));
    setJobCount(newJobId);
    setActiveJobId(newJobId);
    setActiveJob({
      title: "",
      introduction: "",
      role: "",
      minExperience: "",
      maxExperience: "",
      qualification: "",
      salaryRange: "",
      message: "",
      company: "",
      joblocation: "",
      selectedjobType: "",
      selectedlabel: "",
    });
  };

  const handleDuplicateJob = () => {
    if (Object.keys(jobs).length === 0) {
      return;
    }

    const currentJob = jobs[activeJobId];
    const newJobId = jobCount + 1;

    setJobs((prevJobs) => ({
      ...prevJobs,
      [newJobId]: {
        ...currentJob,
      },
    }));
    setJobCount(newJobId);
    setActiveJobId(newJobId);
    setActiveJob(currentJob);
  };

  const handleDeleteJob = () => {
    if (Object.keys(jobs).length === 0) {
      setNoJobsAvailable(true); 
      return;
    }

    const newJobs = { ...jobs };
    delete newJobs[activeJobId];

    if (Object.keys(newJobs).length === 0) {
      setJobs(newJobs);
      setActiveJobId(null);
      setJobCount(0);
      setActiveJob(null);
      setNoJobsAvailable(true);
      return;
    }

    const jobIds = Object.keys(newJobs)
      .map(Number)
      .sort((a, b) => a - b);

    let newActiveJobId;
    const currentIndex = jobIds.indexOf(activeJobId);

    if (currentIndex === -1 || currentIndex === jobIds.length - 1) {
      newActiveJobId = jobIds[jobIds.length - 1];
    } else {
      newActiveJobId = jobIds[currentIndex];
    }

    setJobs(newJobs);
    setActiveJobId(newActiveJobId);
    setActiveJob(newJobs[newActiveJobId]);
    setNoJobsAvailable(false); 
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "showTitle") {
      
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], showTitle: checked },
      }));
    } else if (name === "showIntro") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], showIntro: checked },
      }));
    } else if (name === "showRole") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], showRole: checked },
      }));
    } else if (name === "minExperience") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], minExperience: checked },
      }));
    } else if (name === "maxExperience") {
      setMaxExperience(checked);
    } else if (name === "showQualification") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], showQualification: checked },
      }));
    } else if (name === "showSalaryRange") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], showSalaryRange: checked },
      }));
    } else if (name === "showMessage") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], showMessage: checked },
      }));
    } else if (name === "showCompany") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], showCompany: checked },
      }));
    } else if (name === "showJobLocation") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], showJobLocation: checked },
      }));
    } else if (name === "showSelectedJobType") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: {
          ...oldJobs[activeJobId],
          showSelectedJobType: checked,
        },
      }));
    } else if (name === "showSelectedLabel") {
      setJobs((oldJobs) => ({
        ...oldJobs,
        [activeJobId]: { ...oldJobs[activeJobId], showSelectedLabel: checked },
      }));
    }
  };

  return (
    <div className="md:container px-10 py-4 bg-slate-300">
      <h2 className={styles.headerTite}> Job Post Manager for Website</h2>
      <div className="flex justify-between"></div>
      {activeJobId !== null && activeJob ? (
        <div className={styles.Grid}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <button
                onClick={handleNewJob}
              
                className={styles.jobBtn}
              >
                New Job
                <FaPlus className="ml-2" />
              </button>
              <br />
              {Object.keys(jobs).map((jobId) => (
                <div key={jobId}>
                  <button
                    onClick={() => handleJobChange(jobId)}
                    className={`${styles.jobBtn} ${
                      jobId == activeJobId ? styles.activeJob : ""
                    }`}
                  >
                    Job Post {jobId}
                  </button>
                  <br />
                </div>
              ))}
            </div>

            <div className={styles.detail}>
              <div className={styles.row}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="showTitle"
                    checked={activeJob.showTitle}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Job Post Title"
                    value={activeJob.title}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 text-2xl bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </label>
              </div>
              <div className={styles.rowWithLabel}>
                <input
                  type="checkbox"
                  name="showIntro"
                  checked={activeJob.showIntro}
                  onChange={handleCheckboxChange}
                />
                <label>Introduction</label>

                <br />
                <input
                className={styles.rowWithLabel}
                  type="text"
                  placeholder="The Ideal candidate is someone ..."
                  name="introduction"
                  value={activeJob.introduction}
                  onChange={handleInputChange}
                
                  className={`mt-1 w-full px-3 py-2 text-2xl bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${styles.mlChkWid} ${styles.rowwithLabelStyle} `}
                />
              </div>
              <div className={styles.rowWithLabel}>
                <input
                  type="checkbox"
                  name="showRole"
                  checked={activeJob.showRole}
                  onChange={handleCheckboxChange}
                />
                <label>Roles & Responsibilities</label>

                <br />
                <input
                  type="text"
                  placeholder="your job roll will include..."
                  name="role"
                  value={activeJob.role}
                  onChange={handleInputChange}
                
                  className={`mt-1 w-full px-3 py-2 text-2xl bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${styles.mlChkWid} ${styles.StyleBox}`}
                />
              </div>
              <div className={styles.rowWithLabelExp}>
              <input
                  type="checkbox"
                  name="minExperience"
                  checked={activeJob.minExperience}
                  onChange={handleCheckboxChange}
                  
                  className={`mt-1 w-full px-3 py-2 text-2xl bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${styles.mlChkWid}`}
                  
                />
                <label className="text-sm font-medium">
                  Experience Range(yrs):
                </label>

                <br />
                
                 <select
                className={styles.minInput}
                  name="minExperience"
                  value={activeJob.minExperience}
                  onChange={handleInputChange}
                  
                >
                  <option value="">Min</option>
                  {options}
                </select>
                <span > -   </span>
                <br/>
                <select
                 className={styles.maxInput}
                  name="maxExperience"
                  value={activeJob.maxExperience}
                  onChange={handleInputChange}
                >
                  <option value="">Max</option>
                  {filteredMaxOptions}
                </select>
              </div>
              
              <div className={styles.row}>
                <label className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    name="showQualification"
                    checked={activeJob.showQualification}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Qualification"
                    value={activeJob.qualification}
                    onChange={handleInputChange}
                    className={styles.InputBox}
                  />
                </label>
              </div>
              <div className={styles.row}>
                <label className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    name="showSalaryRange"
                    checked={activeJob.showSalaryRange}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    name="salaryRange"
                    placeholder="Salary Range"
                    value={activeJob.salaryRange}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 text-2xl bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </label>
              </div>
              <div className={styles.row}>
                <label className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    name="showMessage"
                    checked={activeJob.showMessage}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    name="message"
                    placeholder="Call to action concluding statement..."
                    value={activeJob.message}
                    onChange={handleInputChange}
                    className={styles.messageBox}
                  />
                </label>
              </div>
              <div className={styles.row}>
                <label className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    name="showCompany"
                    checked={activeJob.showCompany}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={activeJob.company}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 text-2xl bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </label>
              </div>
              <div className={styles.row}>
                <label className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    name="showJobLocation"
                    checked={activeJob.showJobLocation}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    name="joblocation"
                    placeholder="Job Location"
                    value={activeJob.joblocation}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 text-2xl bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </label>
              </div>
              <div className="flex flex-row space-x-4 mt-4">
                <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                  <input
                    type="checkbox"
                    name="showSelectedJobType"
                    checked={activeJob.showSelectedJobType}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <span>Job Types:</span>
                  <select
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="selectedjobType"
                    value={activeJob.selectedjobType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Job Type</option>
                    {jobTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                  <input
                    type="checkbox"
                    name="showSelectedLabel"
                    checked={activeJob.showSelectedLabel}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <span>Labels:</span>
                  <select
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="selectedlabel"
                    value={activeJob.selectedlabel}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Label</option>
                    {labelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className={styles.right}>
                <div>
                  <button
                    onClick={handleDeleteJob}
                    className={` ${styles.jobBtn}`}
                  >
                     <FaTrash  className={styles.TrashBtn}/> Delete Job
                  </button>
                  <br />

                  <div>
                    <button
                      onClick={handleDuplicateJob}
                      className={styles.jobBtn}
                    >
                      <FaCopy  className={styles.CopyBtn}/>
                      Duplicate Job
                    </button>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <fieldset className="border border-gray-300 p-4 rounded-md">
            <legend className="text-lg font-medium text-gray-700 mb-2">
              <FaSearch className={styles.search} /> Live Preview
            </legend>
            {activeJobId !== null && activeJob && (
              <div className="space-y-4">
                {activeJob.showTitle && (
                  <p className={styles.text}>
                    <span className="font-bold ">
                      <h3>Job Title:</h3>
                    </span>{" "}
                    <h3>{activeJob.title}</h3>
                  </p>
                )}
                {activeJob.showIntro && (
                  <p className="text-lg">
                    <span className="font-bold">Introduction:</span>{" "}
                    {activeJob.introduction}
                  </p>
                )}
                {activeJob.showRole && (
                  <p className="text-lg">
                    <span className="font-bold">Roles & Responsibilities:</span>{" "}
                    {activeJob.role}
                  </p>
                )}
                {activeJob.minExperience && (
                  <p className="text-lg">
                    <span className="font-bold">Experience Range (yrs):</span>{" "}
                    {activeJob.minExperience} - {activeJob.maxExperience}
                  </p>
                )}
                {activeJob.showQualification && (
                  <p className="text-lg">
                    <span className="font-bold">Qualification:</span>{" "}
                    {activeJob.qualification}
                  </p>
                )}
                {activeJob.showSalaryRange && (
                  <p className="text-lg">
                    <span className="font-bold">Salary Range:</span>{" "}
                    {activeJob.salaryRange}
                  </p>
                )}
                {activeJob.showMessage && (
                  <p className="text-lg">
                    <span className="font-bold">Concluding Statement:</span>{" "}
                    {activeJob.message}
                  </p>
                )}
                {activeJob.showCompany && (
                  <p className="text-lg">
                    <span className="font-bold">Company:</span>{" "}
                    {activeJob.company}
                  </p>
                )}
                {activeJob.showJobLocation && (
                  <p className="text-lg">
                    <span className="font-bold">Location:</span>{" "}
                    {activeJob.joblocation}
                  </p>
                )}
                {activeJob.showSelectedJobType && (
                  <p className="text-lg">
                    <span className="font-bold">Job Type:</span>{" "}
                    {activeJob.selectedjobType}
                  </p>
                )}
                {activeJob.showSelectedLabel && (
                  <p className="text-lg">
                    <span className="font-bold">Labels:</span>{" "}
                    {activeJob.selectedlabel}
                  </p>
                )}
              </div>
            )}
          </fieldset>
        </div>
      ) : (
        <div>
          <div className={styles.container}>
            <div className={styles.left}>
              <p className={styles.heading}>
                <span>No Job</span> Available
              </p>
              <p className={styles.heading}>
                <span>please create 1 job atleast</span>
              </p>
            </div>
            <div className={styles.right}>
              <img
                src={JobPost}
                alt="No Job Available please Create 1 job atleast"
              />
            </div>
            <div className={styles.heading}>
              <button
                onClick={handleNewJob}
    
                className={styles.jobBtn}
              >
                New Job
                <FaPlus className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Editor;
