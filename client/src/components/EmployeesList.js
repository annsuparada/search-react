import React from 'react';

class EmployeesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };

    this.handleChange = this.handleChange.bind(this);
    this.searchTerm = this.searchTerm.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  searchTerm() {
    const search = this.state.name.toLocaleLowerCase()
    const name = this.props.employees.map(employee => {
      if (employee.name && employee.name.toLocaleLowerCase().match(search)) {
            return employee.name
          }
    })
    return name.filter(item => typeof item ==='string') // remove undifinded elements
  }

  render() {
    const { employees } = this.props;
    return (
      <React.Fragment>
        <div className="controls">
          <form onSubmit={this.handleSubmit}>
            <input type="text"
              className="filter-input"
              data-testid="filter-input"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </form>
        </div>

        <ul className="employees-list">
          {!this.state.name.length > 0 ?
            <div>
              {employees.map(employee => (
                <li key={employee.name} data-testid="employee">{employee.name}</li>
              ))}
            </div>
            :
            <div>
              {this.searchTerm().map(employee => (
                <li key={employee} data-testid="employee">{employee}</li>
              ))}
            </div>
          }
        </ul>
      </React.Fragment>
    );
  }
}

export default EmployeesList;
