import React from 'react';

function Home(props) {
    return (
        <div className="banner-content">
            <div className="banner-info">
                <div className="banner-caption">Запись на удобное время в ближайшее СТО</div>
                <div className="banner-actions">
                    <a className="banner-to-service" href="/">Записаться
                        на СТО</a>
                    <div className="banner-cancel">Отменить запись</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
