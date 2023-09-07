import React, { useEffect } from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm/UsersSearchForm'
import {
    FilterType,
    followUser,
    requestUsers,
    unfollowUser
} from '../../redux/users-reducer'
import {
    getCurrentPageNumber,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useLocation, useNavigate } from 'react-router-dom'
// import { useQueryParams, StringParam, BooleanParam, NumberParam } from 'use-query-params'
import queryString from 'query-string'

type QueryParamsType = {
    term?: string
    friend?: string
    page?: string
}

const Users: React.FC = (props) => {
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const currentPageNumber = useAppSelector(getCurrentPageNumber)
    const users = useAppSelector(getUsers)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const pageSize = useAppSelector(getPageSize)
    const filter = useAppSelector(getUsersFilter)

    const dispatch = useAppDispatch()

    const location = useLocation() //NOTE - pathname, search, hash, key, state
    const navigate = useNavigate()

    //TODO - useQueryParams impl
    // const [query, setQuery] = useQueryParams({
    //     term: StringParam,
    //     friend: BooleanParam || StringParam,
    //     page: NumberParam
    // })
    // console.log(query);

    

    useEffect(() => {
        const { search } = location // NOTE - адресная строка, URL
        const parsed = queryString.parse(search) as QueryParamsType // NOTE - строка парсится в {}
        
        let actualPage = currentPageNumber
        let actualFilter = filter

        //NOTE - !! = псевдоистина
        if (!!parsed.page) actualPage = +parsed.page //NOTE - если в {} parsed св-во page существует, присвоить перем. actualPage значение parsed.page, т.к стринга, преобразовать в number 
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term } //NOTE - иммутабельность никто не отменял, actualFIlter ссылается на filter
        switch (parsed.friend) {
            case 'null': {
                actualFilter = { ...actualFilter, friend: null }
                break
            }
            case 'true': {
                actualFilter = { ...actualFilter, friend: true }
                break
            }
            case 'false': {
                actualFilter = { ...actualFilter, friend: false }
                break
            }
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter)) //ANCHOR - и dispatch'им запрос юзеров, только вместо currentPageNumber и filter - actualPage и actualFilter;
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {} //NOTE - {}, в кот. значения св-в без default значений (term=''...) 
        
        if (!!filter.term) query.term = filter.term 
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPageNumber !== 1) query.page = String(currentPageNumber)
        
        navigate('?' + queryString.stringify(query)) //NOTE - при смене filter и page - navigate соответственно (friend=${filter.friend}&...)
    }, [filter, currentPageNumber]) //ANCHOR - по итогу срабатывает этот useEffect (filter, currentPageNumber меняются), и происходит маршрутизация

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter)) //NOTE - в filter приходят term и friend, и запрос идет уже с ними; term м.б. '', а сервер проигнорирует friend, если будет null
    }
    const follow = (userId: number) => {
        dispatch(followUser(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowUser(userId))
    }

    return (
        <>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator
                currentPageNumber={currentPageNumber}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
            />
            <div>
                {users.map((u) => (
                    <User
                        user={u}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        follow={follow}
                        key={u.id}
                    />
                ))}
            </div>
        </>
    )
}

export default Users
