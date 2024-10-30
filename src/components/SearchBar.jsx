import React, {useState} from "react";
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("")

/*     const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {

            const results = json.filter((user) => {
                return value && user && user.name && user.name.toLowerCase().includes(value)
            })
            setResults(results)

        })
    } */

    const fetchData = async (value) => {

        if (!value) {
            setResults([])
            return
        }

        try {
            const response = await fetch("/src/data/course_info.json");
            const courses = await response.json();
            const searchValue = value.toLowerCase();
    
            // Helper function to check if the value exists in a specific field
            const includesValue = (field) => field.toLowerCase().includes(searchValue);
    
            // Filter and prioritize matches
            const filteredCourses = courses
                .filter((course) =>
                    includesValue(course["instructor-name"]) ||
                    includesValue(course["course-name"]) ||
                    includesValue(course["course-description"])
                )
                .sort((a, b) => {
                    // Get boolean values for priority matches
                    const priorities = ["instructor-name", "course-name", "course-description"];
                    
                    // Find the first field that matches `value` for each course
                    const getPriorityIndex = (course) =>
                        priorities.findIndex((field) => includesValue(course[field]));
    
                    // Compare priority of a and b based on matched fields
                    return getPriorityIndex(a) - getPriorityIndex(b);
                });
            console.log(filteredCourses);
            setResults(filteredCourses)
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };
    

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return <div className="input-wrapper">
        <FaSearch id="search-icon"/>
        <input 
        placeholder="Type to search..." 
        type="text" 
        value={input} 
        onChange={(e) => handleChange(e.target.value)}
        /> 
    </div>
}