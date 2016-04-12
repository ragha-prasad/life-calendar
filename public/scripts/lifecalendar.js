var settings = {
    canvas: {
        width: 500,
        height: 800
    }
};
var LifeCalendarBox = React.createClass({
    getInitialState: function () {
        return {data: {
            noOfWeeks: 0
        }};
    },
    getNumberOfWeeksSince: function (day, month, year) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'GET',
            data: {day: day, month: month, year: year},
            success: function onSuccess(res) {
                this.setState({data: res});
            }.bind(this),
            error: function onError(xhr, status, err) {
                console.log('Error encountered', xhr, status, err);
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="lifeCalendarBox">
                <h4> Life Calendar </h4>
                <DateBox getNumberOfWeeksSince={this.getNumberOfWeeksSince}/>
                <CalendarBox  data={this.state.data} settings={this.props.settings}/>
            </div>);
    }
});

var CalendarBox = React.createClass({
    componentDidUpdate: function () {
        this.drawCanvas();
    },
    componentDidMount: function () {
        this.drawCanvas();
    },
    drawCanvas: function() {
        console.log(this.props.data);
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
                if (j % 5 === 0 && i === 51) {
                    ctx.font="10px";
                    ctx.fillText(j, startI+10, startJ);
                }
            }
        }
    },
    render: function () {
        return (<canvas ref="canvas"
            width={this.props.settings.canvas.width}
            height={this.props.settings.canvas.height} />);
    }
});

var DateBox = React.createClass({
    getInitialState: function () {
        return {day: '', month: '', year: ''};
    },
    handleDayChange: function(e) {
        this.setState({day: e.target.value});
    },
    handleMonthChange: function(e) {
        this.setState({month: e.target.value});
    },
    handleYearChange: function(e) {
        this.setState({year: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var day = this.state.day.trim();
        var month = this.state.month.trim();
        var year = this.state.year.trim();

        if (!day || !month || !year) {
           return;
        }

        this.props.getNumberOfWeeksSince(day, month, year);

        this.setState({day: '', month: '', year: ''});
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
            value="Submit" />
            </form>
        );
    }
});

ReactDOM.render(
  <LifeCalendarBox url='/numberOfWeeks' settings={settings}/>,
  document.getElementById('content')
);
