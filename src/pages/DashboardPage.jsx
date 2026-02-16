import {Box, Loader} from "@chakra-ui/react";
import {Toaster} from '../components/ui/toaster.jsx'
import Header from "../components/Header.jsx";
import TransactionList from "../components/TransactionList.jsx";
import SidePanel from "../components/SidePanel.jsx";
import {useEffect, useState} from "react";
import {getCategories, getTransactions, getUserInfo} from "../api/index.js";
import {formatDate} from "../util/util.js";
import GoalList from "../components/GoalList.jsx";

function DashboardPage() {
    const [transactions, setTransactions] = useState([]);
    const [isTransactionsLoading, setTransactionsLoading] = useState(true);

    const [userInfo, setUserInfo] = useState('');
    const [isUserInfoLoading, setUserInfoLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [isCategoriesLoading, setCategoriesLoading] = useState(true);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesResponse = await getCategories();
                setCategories(categoriesResponse);
            } catch (error) {
                console.log(error);
            } finally {
                setCategoriesLoading(false);
            }
        }
        fetchCategories();
    }, [])

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUserInfo(userInfo);
            } catch (error) {
                console.log(error);
            } finally {
                setUserInfoLoading(false);
            }
        }
        fetchUserInfo();
    }, [])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactionMap = await getTransactions();
                setTransactions(transactionMap);
            } catch (error) {
                console.log(error);
            } finally {
                setTransactionsLoading(false);
            }
        }
        fetchTransactions();
    }, [])

    const addNewTransaction = (transaction) => {
        const now = formatDate(new Date());
        if (transactions[now]) {
            transactions[now] = [transaction, ...transactions[now]];
        } else {
            transactions[now] = [transaction];
        }
        setTransactions(transactions);
    }

    const deleteTransaction = (transaction) => {
        const time = formatDate(transaction.time);
        transactions[time] = transactions[time].filter(t => t.id !== transaction.id);

        if (transactions[time].length === 0) {
            const {[time]: __, ...newTransactions} = transactions;
            setTransactions(newTransactions);
        } else {
            setTransactions(transactions);
        }
    }

    const updateBalance = (newBalance) => {
        setUserInfo({...userInfo, balance: newBalance});
    }

    return (
        <Box pt="16" pr="60" m="0 auto">
            <Header/>
            <SidePanel userInfo={userInfo}
                       isUserInfoLoading={isUserInfoLoading}
                       categories={categories}
                       isCategoriesLoading={isCategoriesLoading}
                       addNewTransaction={addNewTransaction}
                       updateBalance={updateBalance}
            />
            <GoalList/>
            {isTransactionsLoading
                ? <Loader/>
                : <TransactionList transactions={transactions}  deleteTransaction={deleteTransaction} userInfo={userInfo} updateBalance={updateBalance} />}
            <Toaster/>
        </Box>
    )
}

export default DashboardPage;