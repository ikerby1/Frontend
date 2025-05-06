/* Script.js - Renders the course list on the Index page using React */

class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      search: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchCourses = this.fetchCourses.bind(this);
  }
  
  componentDidMount() {
    this.fetchCourses();
  }
  
  fetchCourses() {
    let url = '/api/courses';
    if (this.state.search) {
      url += '?search=' + encodeURIComponent(this.state.search);
    }
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ courses: data }))
      .catch(err => console.error(err));
  }
  
  handleSearch(e) {
    this.setState({ search: e.target.value }, () => {
      this.fetchCourses();
    });
  }
  
  render() {
    return (
      <div>
        <input 
          type="text" 
          placeholder="Search courses by name or number"
          value={this.state.search}
          onChange={this.handleSearch}
        />
        <ul>
          {this.state.courses.map(course => (
            <li key={course._id}>
              <a href={`Details.html?id=${course._id}`}>{course.name}</a> – {course.credits} credits
              {/* Optional: If the user is a teacher, you could render Edit/Delete links */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<CourseList />, document.getElementById('root'));
