var LifeCalendarBox = React.createClass({
    render: function() {
        return (
            <div className="lifeCalendarBox">
                <h1> Life Calendar </h1>
                <DateBox />
                <CalendarBox />
            </div>);
    }
});


var CalendarBox = React.createClass({
    render: function () {
        return (
            <div>
                Boxes go here.
            </div>);
    }
});


var DateBox = React.createClass({
    getInitialState: function () {
        return {day: '', month: '', year: ''};
    },
    handleDayChange: function(e) {
        console.log('day', e.target.value);
        this.setState({day: e.target.value});
    },
    handleMonthChange: function(e) {
        console.log('month', e.target.value)
        this.setState({month: e.target.value});
    },
    handleYearChange: function(e) {
        console.log('year', e.target.value);
        this.setState({year: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        console.log('Handling the submission');
        var day = this.state.day.trim();
        var month = this.state.month.trim();
        var year = this.state.year.trim();

        if (!day || !month || !year) {
           return;
        }

        console.log("Current state: ", this.state);

        this.setState({day: 'DD', month: 'MM', year: 'YYYY'});
    },
    render: function() {
        return (
            <form className="dateBox" onSubmit={this.handleSubmit}>
            <input id="day"
                type="tel"
                maxLength={2}
                placeholder="DD"
                value={this.state.day}
                onChange={this.handleDayChange} /> /
            <input id="month"
                type="tel"
                maxLength={2}
                placeholder="MM"
                value={this.state.month}
                onChange={this.handleMonthChange} />/
            <input
                id="year"
                type="tel"
                maxLength={4}
                placeholder="YYYY"
                value={this.state.year}
                onChange={this.handleYearChange} />
            <input
            type="submit"
            value="Post" />
            </form>
        );
    }
});

ReactDOM.render(
  <LifeCalendarBox />,
  document.getElementById('content')
);


// $('#date1 input').autotab_magic().autotab_filter('numeric');
// $('#date1 input').datepicker()