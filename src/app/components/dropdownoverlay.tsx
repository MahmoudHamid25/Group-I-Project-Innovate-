'use client';

function DropdownOverlay() {
    return (
        <div className="dropPosition">
            <div className="dropdownMenu">
                <a href="./">Home</a>
                <a href="/main/">After_Logging_in</a>
                {/*<a href="/profile/">After_log_in_Profile</a>*/}
                <a href="/uploading/">Prototype</a>
            </div>
        </div>
    );
}

export default DropdownOverlay;
