import moment from 'moment'
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    FlatList,
    Button,
    ScrollView
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { range } from 'lodash'

const { width, height } = Dimensions.get('window')
var toYear = (moment(new Date()).format('YYYY'))
var toMonth = (moment(new Date()).format('MM'))
var lastMonthArray = []
var thisMonthArray = []
var nextMonthArray = []

class CalendarView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            calendarType: 1 //1是月模式 2是周模式 3是日模式 
        }
        this.onPressToday = this.onPressToday.bind(this)
        this.onPressPrevious = this.onPressPrevious.bind(this)
        this.onPressNext = this.onPressNext.bind(this)
        this.onPressDay = this.onPressDay.bind(this)
        this.onPressWeek = this.onPressWeek.bind(this)
        this.onPressMonth = this.onPressMonth.bind(this)
        this.onPressSelectDay = this.onPressSelectDay.bind(this)
        this.onPressSelectDayForWeekModal = this.onPressSelectDayForWeekModal.bind(this)
        this.onPressMonthTitle = this.onPressMonthTitle.bind(this)
    }


    //获取当前月第一天的日期
    getCurrentMonthFirst() {
        console.log(this)
        var date = new Date(this.state.selectedDate.getTime())
        date.setDate(1)
        return date
    }

    //获取某天在一周中的序列index，从0开始
    getDayOfWeekIndex(day) {
        return day.getDay()
    }

    //获取这个月日历上的上个月的天数
    getLastMonthDayArray() {
        //当月的第一天
        let firstDay = this.getCurrentMonthFirst()
        // 当月的第一天index
        let firstDayIndex = this.getDayOfWeekIndex(firstDay)
        if (firstDayIndex === 0) {
            return []
        }
        var lastMonthArray = []
        for (var i = 0; i < firstDayIndex; i++) {
            var tmpDate = this.getBeforeDayDate(firstDay, i + 1)
            lastMonthArray.push(tmpDate.getDate())
        }
        return lastMonthArray.reverse()
    }

    //获取日历上的下个月的天数
    getNextMonthDayArray(nextMonthNum) {
        //获取下个月的第一天
        var dateToday = new Date(this.state.selectedDate.getTime())
        var currentMonth = dateToday.getMonth()
        dateToday.setMonth(currentMonth++)
        dateToday.setDate(1)
        var nextMonthArray = []
        for (var i = 0; i < nextMonthNum; i++) {
            let tmpDate = this.getAfterDayDate(dateToday, i)
            nextMonthArray.push(tmpDate.getDate())
        }
        return nextMonthArray
    }

    //获取几天前的日期
    getBeforeDayDate(startDate, dayNum) {
        var date = startDate, timestamp;
        timestamp = date.getTime();
        // 获取day天前的日期  
        return new Date(timestamp - dayNum * 24 * 3600 * 1000);
    }

    //获取几天后的日期
    getAfterDayDate(startDate, dayNum) {
        var date = startDate, timestamp;
        timestamp = date.getTime();
        // 获取day天之后的日期  
        return new Date(timestamp + dayNum * 24 * 3600 * 1000);
    }

    //获取当前月最后一天的日期
    getCurrentMonthLast() {
        var date = new Date(this.state.selectedDate.getTime())
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
    }

    //获取上个月同一天
    getLastMonthSameDay(date, isRtnNull = false) {
        var curdate = date.getDate();
        var lastmonth = new Date(date.getTime());// 不直接修改原对象
        lastmonth.setDate(0)//上月最后一天，当前月为一月时这种写法会退到上一年十二月
        var lastmax = lastmonth.getDate();
        if (curdate <= lastmax) {//天值不大于上月最大一天，天值同步
            lastmonth.setDate(curdate);
        } else {
            if (isRtnNull) return null;
        }
        console.log('上个月同一天', lastmonth)
        return lastmonth;
    }

    //获取下个月同一天
    getNextMonthSameDay(date) {
        return moment(date).add(1,'months').toDate()
    }


    onPressNext() {
        console.log('下一月')
        if (this.state.calendarType === 1){
            //月模式
            //下一月
            this.setState({
                selectedDate: this.getNextMonthSameDay(this.state.selectedDate)
            })
        }else if (this.state.calendarType === 2){
            //周模式
            this.setState({
                selectedDate: moment(this.state.selectedDate).add(7,'days').toDate()
            })
        }else{
            //天模式
            this.setState({
                selectedDate:moment(this.state.selectedDate).add(1,'days').toDate()
            })
        }
        //切换下面列表数据
        // TODO:
    }

    onPressPrevious() {
        console.log('上一月')
        if (this.state.calendarType === 1){
            //月模式
            //上一月
        this.setState({
            selectedDate: this.getLastMonthSameDay(this.state.selectedDate)
        })
        }else if (this.state.calendarType === 2){
            //周模式
            this.setState({
                selectedDate: moment(this.state.selectedDate).subtract(7,'days').toDate()
            })
        }else{
            //天模式
            this.setState({
                selectedDate:moment(this.state.selectedDate).subtract(1,'days').toDate()
            })
        }
        //切换下面列表数据
        // TODO:
    }

    onPressToday() {
        console.log('今天')
        this.setState({
            selectedDate: new Date(),
        })
    }

    onPressSelectDay(selectDay) {
        let momentd = moment(this.state.selectedDate)
        this.setState(
            {
                selectedDate: momentd.date(selectDay).toDate()
            }
        )
    }

    //周模式的点击某天
    onPressSelectDayForWeekModal(date){
        console.log('点击了',date)
        this.setState(
            {
                selectedDate: date
            }
        )
    }

    //点击月份可以显示月维度的任务
    onPressMonthTitle(month){
        console.log('该月为',month+1)
        //刷新列表
    }

    onPressMonth() {
        console.log('切换为月')
        this.setState({
            calendarType: 1
        })
    }
    onPressWeek() {
        console.log('切换为周')
        this.setState({
            calendarType: 2
        })
    }
    onPressDay() {
        console.log('切换为日')
        this.setState({
            calendarType: 3
        })
    }


    renderWeekDays() {
        let weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        return weekdays.map((day) => {
            return (
                <Text key={day} style={styles.calendar_weekdays_text}>{day.toUpperCase()}</Text>
            );
        });
    }

    renderWeeks() {
        //日历一共有42天，最多包括上个月，这个月，下个月的日期，上个月和下个月的用灰色标识
        var past_month_days = this.getLastMonthDayArray()
        //range方法是左闭右开
        var this_month_days = range(1, moment(this.state.selectedDate).daysInMonth() + 1)
        var next_month_days = past_month_days.length + this_month_days === 42 ? [] :
            this.getNextMonthDayArray(42 - past_month_days.length - this_month_days.length)
        lastMonthArray = past_month_days
        thisMonthArray = this_month_days
        nextMonthArray = next_month_days

        let days = [].concat(past_month_days, this_month_days, next_month_days)

        let grouped_days = this.getWeeksArray(days)

        return grouped_days.map((week_days, index) => {
            return (
                <View key={index} style={styles.week_days}>
                    {this.renderDays(index, week_days)}
                </View>
            )
        })
    }

    renderDays(currentWeek, week_days) {
        return week_days.map((day, index) => {
            if ((currentWeek == 0 && index < lastMonthArray.length) || (currentWeek > (6 - parseInt(nextMonthArray.length / 7) - 1)) ||
                (currentWeek === (6 - parseInt(nextMonthArray.length / 7) - 1) && (index > (7 - nextMonthArray.length % 7 - 1)))) {
                return (
                    <View key={index} style={
                        styles.day
                    }><TouchableOpacity>
                            <Text style={styles.days_text_noCurrentMonth}>{day}</Text>
                        </TouchableOpacity></View>
                )
            } else {
                if (day === this.state.selectedDate.getDate()) {
                    return (
                        <View key={index} style={
                            styles.day
                        }><TouchableOpacity onPress={() => this.onPressSelectDay(day)}>
                                <Text style={styles.day_text_selected}>{day}</Text>
                            </TouchableOpacity></View>
                    )
                } else {
                    return (
                        <View key={index} style={
                            styles.day
                        }><TouchableOpacity onPress={() => this.onPressSelectDay(day)}>
                                <Text style={styles.day_text}>{day}</Text>
                            </TouchableOpacity></View>
                    )
                }
            }
        }
        )
    }

    renderDaysForWeekModal() {

        var momentSelected = moment(this.state.selectedDate)
        var selectedDateIndex = momentSelected.day()
        return range(0, 7).map((_, index) => {
            var date = moment(momentSelected.day(index))
            if (selectedDateIndex === index) {
                console.log('被选择的moment-============', date.date())
                return (
                    <View key={index} style={
                        styles.day
                    }><TouchableOpacity onPress={() => this.onPressSelectDayForWeekModal(date.toDate())}>
                            <Text style={styles.week_modal_day_text_selected}>{date.format('MM/DD')}</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                console.log('被选择的moment-============', date.date())
                return (
                    <View key={index} style={
                        styles.day
                    }><TouchableOpacity onPress={() => this.onPressSelectDayForWeekModal(date.toDate())}>
                            <Text style={styles.week_modal_day_text}>{date.format('MM/DD')}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        )
    }

    getWeeksArray(days) {
        var weeks_r = []
        var seven_days = []
        var count = 0
        days.forEach(day => {
            count += 1
            seven_days.push(day)
            if (count == 7) {
                weeks_r.push(seven_days)
                count = 0
                seven_days = []
            }
        });
        return weeks_r
    }

    //周模式
    renderCalendarView() {
        if (this.state.calendarType === 1) {
            console.log('这是月模式CalendarView')
            return (
                <View>
                    {/* 月份 可点击，点击之后刷新列表为月份的列表 */}
                    <View style = {{flexDirection:'row',justifyContent:'center'}}><TouchableOpacity onPress={()=>this.onPressMonthTitle(moment(this.state.selectedDate).month())}>
            <Text style = {{fontSize: 25}}>{moment(this.state.selectedDate).format('MM月')}</Text></TouchableOpacity></View>
                    <View style={styles.calendar_weekdays}>
                        {this.renderWeekDays()}
                    </View>
                    <View>
                        {this.renderWeeks()}
                    </View>
                </View>
            )
        } else if (this.state.calendarType === 2) {
            console.log('这是周模式CalendarView')
            return (
                <View>
                    <View>
                        <View style={styles.calendar_weekdays}>{this.renderWeekDays()}</View>
                    </View>
                    <View style={styles.week_days}>
                        {this.renderDaysForWeekModal()}
                    </View>
                </View>
            )
        } else if (this.state.calendarType === 3) {
            console.log('这是日模式CalendarView')
            return (
                <View>

                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <View style={styles.titleBack}>
                        <Text style={styles.title}>日历</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: "row", marginLeft: 17, marginTop: 17 }}>
                            <TouchableOpacity onPress={this.onPressPrevious}>
                                <Text style={styles.previousBtn} >上一个</Text>
                            </TouchableOpacity>
                            <View style={styles.horiSeprator} />
                            <TouchableOpacity onPress={this.onPressNext}>
                                <Text style={styles.previousBtn}>下一个</Text>
                            </TouchableOpacity>
                            <View style={styles.horiSeprator} />
                            <TouchableOpacity onPress={this.onPressToday}>
                                <Text style={styles.previousBtn}>今天</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 17, marginTop: 17 }}>
                            <TouchableOpacity onPress={this.onPressMonth}>
                                <Text style={styles.changeStatusBtn}>月</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressWeek}>
                                <Text style={styles.changeStatusBtn}>周</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressDay}>
                                <Text style={styles.changeStatusBtn}>日</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.titleBack}>
                        <Text style={{ color: 'black', fontSize: 25, textAlign: 'center' }}>{this.state.selectedDate.toDateString()}</Text>
                    </View>
                    {this.renderCalendarView()}
                    {/* 任务list */}
                    <FlatList data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} renderItem={({ item }) => <View style={styles.taskItem}><Text>{item}</Text></View>}></FlatList>
                </View>
            </ScrollView>

        )
    }
}


const styles = StyleSheet.create({
    titleBack: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 17
    },
    title: {
        fontSize: 30,
        color: '#0000ff'
    },
    previousBtn: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: '600',
        textAlign: "center",
    },
    horiSeprator: {
        width: 17
    },
    changeStatusBtn: {
        backgroundColor: 'black',
        fontSize: 16,
        fontWeight: '600',
        textAlign: "center",
        color: 'white',
        width: 30
    },
    calendar_weekdays_text: {
        flex: 1,
        color: '#C0C0C0',
        textAlign: 'center'
    },
    calendar_weekdays: {
        marginTop: 17,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    week_days: {
        flexDirection: 'row'
    },
    day: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 5,
        margin: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    day_text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
    days_text_noCurrentMonth: {
        textAlign: 'center',
        color: '#A9A9A9',
        fontSize: 20,
    },
    day_text_selected: {
        textAlign: 'center',
        color: '#4169E1',
        fontSize: 20,
    },
    taskItem: {
        height: 30
    },
    week_modal_day_text:{
        textAlign: 'center',
        color: 'black',
        fontSize: 14,
    },
    week_modal_day_text_selected:{
        textAlign: 'center',
        color: '#4169E1',
        fontSize: 14,
    }
})


export default CalendarView