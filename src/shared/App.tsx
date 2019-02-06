import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { setLocale } from './store/app/actions';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import Features from 'shared/components/Features';
import css from './App.module.css';

type PropsT = {
    setLocale: (locale: string) => {};
    t: (key: string) => string;
};

class App extends React.PureComponent<PropsT> {
    setLanguage = (e: React.FormEvent<HTMLButtonElement>) => {
        this.props.setLocale(e.currentTarget.value);
    };

    render() {
        const { t } = this.props;

        return (
            <div className={css.wrapper}>
                <Helmet
                    defaultTitle="React SSR Starter"
                    titleTemplate="%s – React SSR Starter – TypeScript Edition"
                />

                <h1>
                    <ReactLogo className={css.reactLogo} /> React + Express – SSR Starter –
                    TypeScript Edition
                </h1>

                <Features />

                <h2>{t('i18n-example')}</h2>
                <p>
                    <button value="de_DE" onClick={this.setLanguage}>
                        Deutsch
                    </button>
                    <button value="en_US" onClick={this.setLanguage}>
                        English
                    </button>
                </p>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setLocale,
};

export default connect(
    null,
    mapDispatchToProps
)(withNamespaces()<any>(App));
