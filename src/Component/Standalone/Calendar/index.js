import {isSameDay, startOfWeek, getDay} from "date-fns";
// import getDay from "date-fns/get_day";
import {addDays, endOfWeek, isSameMonth} from "date-fns/esm";
import format from "date-fns/format";
import React, {useEffect} from "react";
import "./Calendar.css";
import RightIcon from "@material-ui/icons/ChevronRightRounded";
import LeftIcon from "@material-ui/icons/ChevronLeftRounded";
import classNames from "classnames";
import {reducer} from "./reducer";
import {isUndefined} from "../../../Utils";
import useResponsiveOffset from "../../../Hooks/Layout/useResponsiveOffset/index";
import useComponent from "../../../Hooks/Component/useComponent/index";

const initialState = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    weekCount: 0,
    startDate: null,
    endDate: null,
};

function Calendar(props) {
    const [state, dispatch] = useComponent({
        reducer,
        ...initialState,
        hooks: props.hooks,
    });
    const {currentMonth, selectedDate, weekCount, startDate, endDate} = state;
    const {calendarClass, dayClass, renderDay} = props;
    const {showHeader, picker} = props.extProperties;

    const {headerRef, daysRef, bodyRef, containerRef} = useResponsiveOffset({
        staticArr: ["headerRef", "daysRef"],
        responsiveArr: ["bodyRef"],
    });

    useEffect(() => {
        onDateClick(new Date());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        switch (picker) {
            case "week":
                const currentDate = new Date();
                dispatch({
                    type: "UPDATE_CALENDAR",
                    payload: {
                        startDate: startOfWeek(currentDate),
                        endDate: endOfWeek(currentDate),
                    },
                });
                dispatch({type: "COUNT_WEEKS"});
                break;
            default:
                dispatch({type: "INIT_CALENDAR"});
                dispatch({type: "COUNT_WEEKS"});
                break;
        }
    }, [currentMonth, dispatch, picker]);

    const dayRender = ({date, dateFormat}) => {
        const formattedDate = format(date, dateFormat);
        const isInCurrentMonth = isSameMonth(date, currentMonth);
        const checkCurrentMonth = picker === "week" ? false : true;
        const dayComponent = (
            <>
                <span className="number">{formattedDate}</span>
                {/* <span className="bg">{formattedDate}</span> */}
            </>
        );
        const actualDay = renderDay
            ? renderDay({
                  date,
                  selectedDate,
                  isInCurrentMonth,
                  dayComponent,
              })
            : dayComponent;
        return (
            <div
                className={classNames(
                    `col cell ${
                        !isInCurrentMonth && checkCurrentMonth
                            ? "disabled"
                            : isSameDay(date, selectedDate)
                            ? "selected"
                            : ""
                    }`,
                    isUndefined(dayClass)
                )}
                key={date}
                onClick={() => onDateClick(new Date(date))}
            >
                {actualDay}
            </div>
        );
    };

    const renderHeader = () => {
        const dateFormat = "MMMM-yyyy";

        return (
            <div ref={headerRef} className="header row flex-middle">
                <div className="col col-start">
                    <LeftIcon
                        className="icon"
                        aria-label="Previous month"
                        onClick={prevMonth}
                    />
                </div>
                <div className="date col-center">
                    <span>{format(currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end">
                    <RightIcon
                        className="icon"
                        aria-label="Next month"
                        onClick={nextMonth}
                    />
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = "E";
        const days = [];

        let startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return (
            <div ref={daysRef} className="days row">
                {days}
            </div>
        );
    };

    const renderCells = () => {
        const dateFormat = "d";
        const rows = [];

        let days = [];
        let date = new Date(startDate);

        while (date <= endDate) {
            for (let i = 0; i < 7; i++) {
                days.push(dayRender({date, dateFormat}));
                date = addDays(date, 1);
            }
            rows.push(
                <div
                    className="row"
                    key={date}
                    style={{height: `calc(100%/${weekCount})`}}
                >
                    {days}
                </div>
            );
            days = [];
        }
        // let offset = "0px";

        return (
            <div ref={bodyRef} className="body">
                {rows}
            </div>
        );
        // return <div ref={bodyRef} className="body" style={{ height: `calc(100% - 30px)` }} >{rows}</div>;
    };

    const onDateClick = (day) => {
        dispatch({type: "UPDATE_CALENDAR", payload: {selectedDate: day}});
        if (props.onDateClick) {
            props.onDateClick(day);
        } else {
            dispatch({
                type: "UPDATE_CALENDAR",
                payload: {id: props.id, selected: [getDay(day)]},
            });
        }
    };

    const nextMonth = () => {
        dispatch({type: "ADD_MONTH"});
    };

    const prevMonth = () => {
        dispatch({type: "SUB_MONTH"});
    };

    return (
        <div
            ref={containerRef}
            className={classNames("calendar", isUndefined(calendarClass))}
        >
            {showHeader === false ? null : renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
}

export default Calendar;
