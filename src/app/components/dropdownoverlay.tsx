'use client';

function DropdownOverlay() {
    return (
        <div className="dropPosition">
            <div className="dropdownMenu">
                <a href="./">Home</a>
                <a href="/main/">Main</a>
                <a href="/profile/">Profile</a>
                <a href="/upload/">Generate a quiz</a>
                <a href="/leaderboard/">Leaderboard</a>
            </div>
        </div>
    );
}

export default DropdownOverlay;
