var data = {
    noOfWeeks: 1612
};

var LifeCalendarBox = React.createClass({
    render: function() {
        return (
            <div className="lifeCalendarBox">
                <h4> Life Calendar </h4>
                <DateBox />
                <CalendarBox  data={data}/>
            </div>);
    }
});

var CalendarBox = React.createClass({
    getInitialState: function () {
        return {
            canvas: {
                width: 500,
                height: 800
            },
            data: {
                noOfWeeks: 0
            }
        };
    },
    componentDidMount: function () {
        this.initCanvas();
    },
    initCanvas: function() {
        const ctx = this.refs.canvas.getContext('2d');
        var noOfWeeks = this.props.data.noOfWeeks;
        var totalWeeks = 0;
        for (var j = 1; j <= 90; j++) {
            for (var i = 0; i < 52; i++)  {
                totalWeeks+=1;
                if (totalWeeks < noOfWeeks) {
                    ctx.fillStyle='green';
                } else {
                    ctx.fillStyle='red';
                }

                var startI = (i*6) + 1;
                var startJ = (j*6) + 1;
                ctx.fillRect(startI, startJ, 3, 3);
                if (j % 5 == 0 && i == 51) {
                    ctx.font="10px";
                    ctx.fillText(j, startI+10, startJ);
                }
            }
        }
    },
    render: function () {
        return (<canvas ref="canvas"
            width={this.state.canvas.width}
            height={this.state.canvas.height} />);
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
  <LifeCalendarBox data={data}/>,
  document.getElementById('content')
);
