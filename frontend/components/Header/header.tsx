import styles from "./header.module.css";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.title}>ระบบจัดการการสอน</h1>
                <ul className={styles.headerLinks}>
                    <li>
                        <button
                            // onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            <FiLogOut size={20} />
                            ออกจากระบบ
                        </button>
                    </li>
                </ul>
            </header>
        </div>
    );
}