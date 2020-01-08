import React, { useState, useContext } from "react"
import {
    Col,
    Row,
    Button,
    FormGroup,
    Input,
    Container,
    Navbar,
    Table
} from "reactstrap"

import "./index.css"

import { drizzleReactHooks } from "@drizzle/react-plugin"
import { newContextComponents } from "@drizzle/react-components"
import { Formik, Form, Field } from "formik"

const { ContractData } = newContextComponents

const styles = {
    Navbar: {
        backgroundColor: "var(--color-dark-purple)",
        paddingLeft: "50px",
        color: "var(--color-gray-6)",
        fontStyle: "italic"
    },
    About: {
        backgroundColor: "var(--color-pastelle-blue)",
        padding: "50px",
        color: "var(--color-gray-6)"
    },
    Contracts: {
        backgroundColor: "var(--color-pastelle-aqua)",
        padding: "50px",
        color: "var(--color-gray-6)"
    },
    GetStarted: {
        backgroundColor: "var(--color-pastelle-pink)",
        padding: "50px",
        color: "var(--color-gray-1)"
    },
    Bounties: {
        backgroundColor: "var(--color-pastelle-brown)",
        padding: "50px",
        color: "var(--color-gray-6)"
    },
    a: { color: "var(--color-gray-6)" },
    cellBreakWord: {
        wordWrap: "break-word",
        maxWidth: "1px"
    }
}

const BountyCreateForm = ({ handleCreateDeal }) => (
    <Formik
        initialValues={{
            _beneficiary: '', _bounty: '', _expiryBlock: '',
            _targetContract: '', _targetCallData: '', _targetResponse: ''
        }}
        validate={values => {
            const errors = {};
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            handleCreateDeal(values);
            setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
            <Form>
                <FormGroup>
                    <Field type="text" name="_beneficiary" placeholder="Beneficiary" as={Input} />
                </FormGroup>
                <FormGroup>
                    <Field type="number" name="_bounty" placeholder="Bounty (ETH)" as={Input} />
                </FormGroup>
                <FormGroup>
                    <Field type="text" name="_expiryBlock" placeholder="Expiry Block" as={Input} />
                </FormGroup>
                <FormGroup>
                    <Field type="text" name="_targetContract" placeholder="Target Contract (address)" as={Input} />
                </FormGroup>
                <FormGroup>
                    <Field type="text" name="_targetCallData" placeholder="Target Call Data (bytes)" as={Input} />
                </FormGroup>
                <FormGroup>
                    <Field type="text" name="_targetResponse" placeholder="Target Response (bytes)" as={Input} />
                </FormGroup>
                <Button type="submit" disabled={isSubmitting}>Create Bounty</Button>
            </Form>
        )}
    </Formik>
)

const BountyFilterForm = () => (
    <Formik
        initialValues={{ minBounty: '', contract: '' }}
        validate={values => { }}
        onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
            <Form>
                <FormGroup>
                    <Field type="number" name="minBounty" placeholder="Minimum Bounty (ETH)" as={Input} />
                </FormGroup>
                <FormGroup>
                    <Field type="text" name="contract" placeholder="Contract" as={Input} />
                </FormGroup>
                <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </Form>
        )}
    </Formik>
)

const BountyTable = ({ deals, handleSettleDeal, handleRefundDeal, blockNumber }) => {
    console.log(blockNumber)
    return (
        <>
        <h4>Current Block: {blockNumber}</h4>
        <Table style={{width: "100%", borderCollapse: "collapse"}} dark>
            <thead>
                <tr>
                    <th>#</th>
                    <th>State</th>
                    <th>Creator</th>
                    <th>Contract</th>
                    <th>Call Data</th>
                    <th>Response Data</th>
                    <th>Expiry</th>
                    <th>Bounty</th>
                    <th>Settle</th>
                    <th>Refund</th>
                </tr>
            </thead>
            <tbody>
                {
                    deals.map((deal, idx) => {
                        const expired = deal?.expiryBlock <= blockNumber
                        return (
                        <tr key={idx}>
                            <th scope="row">{idx}</th>
                            <td style={styles.cellBreakWord} >{deal?.settled ? "Settled" : (expired ? "Expired" : "Active")}</td>
                            <td style={styles.cellBreakWord}>{deal?.creator}</td>
                            <td style={styles.cellBreakWord}>{deal?.targetContract}</td>
                            <td style={styles.cellBreakWord}>{deal?.targetCallData}</td>
                            <td style={styles.cellBreakWord}>{deal?.targetResponse}</td>
                            <td style={styles.cellBreakWord}>{deal?.expiryBlock}</td>
                            <td style={styles.cellBreakWord}>{deal?.bounty}</td>
                            <td style={styles.cellBreakWord}>
                                <Button value={idx} onClick={handleSettleDeal} disabled={deal?.settled || expired}>Settle</Button>
                            </td>
                            <td style={styles.cellBreakWord}>
                                <Button value={idx} onClick={handleRefundDeal} disabled={deal?.settled || !expired}>Refund</Button>
                            </td>
                        </tr>
                    )})
                }
            </tbody>
        </Table>
        </>
    )
}

const HomeAbout = () => (<div>
    <h1>About</h1>
    <p>
        Welcome to the first general purpose collusion contract on Ethereum!
        ETH Collude is a simple contract that works by defining “bounties”
        with a target beneficiary, contract and result. At any point in time
        any user (or contract!) can trigger the bounty. If the bounty’s
        target contract returns the target result, the beneficiary will be
        paid out the result. In addition, bounties have an expiryBlock after
        which they can no longer be triggered (and can be refunded to their
        creator).
            <br />
        <br />
        While this mechanism is particularly interesting in the context of
        trust-less multi-party collusion (or coordination), one can imagine
        a variety of other use cases as well. The ETH Collude contract is
        agnostic to the target contract’s interface which makes it
        particularly useful. One can build adapter contracts on-chain to
        simplify the interface or opt to compute the BaseCollude inputs
        off-chain (marginally cheaper gas cost but less practical).
            <br />
        <br />
        Telegram: @leovigna
          </p>
</div>)

const HomeContracts = () => (<div>
    <h1>Contracts</h1>
    <p>
        Listed below are the contracts that enable the ETH Collude system.
            The <b>BaseCollude.sol</b> contract is the only necessary component.
It uses raw bytes as inputs for the args, and target response. Other
&quot;adapters&quot; can enable automatic parsing of arguments to
simplify interfacing with the BaseCollude contract. We use the
TestCollude.sol contract as an example of this as the contract
parses the target response as an integer.
          </p>
    <Row>
        <Col>
            <a style={styles.a} href="BaseCollude.sol">
                BaseCollude.sol
              </a>
        </Col>
        |
            <Col>
            <a style={styles.a} href="github.com">
                Ropsten
              </a>
        </Col>
        |
            <Col>
            <a style={styles.a} href="#">
                Mainnet (TBD)
              </a>
        </Col>
    </Row>
    <Row>
        <Col>
            <a style={styles.a} href="TestCollude.sol">
                TestCollude.sol
              </a>
        </Col>
        |
            <Col>
            <a style={styles.a} href="github.com">
                Ropsten
              </a>
        </Col>
        |
            <Col>
            <a style={styles.a} href="#">
                Mainnet (TBD)
              </a>
        </Col>
    </Row>
</div>
)

const Home = ({ deals, BaseCollude, currentBlock }) => {
    console.log(currentBlock)
    const handleCreateDeal = ({
        _beneficiary, _bounty, _expiryBlock,
        _targetContract, _targetCallData, _targetResponse,
    }) => {
        console.log(_beneficiary)
        BaseCollude.methods.createDeal(_beneficiary, _expiryBlock, _targetContract, _targetCallData, _targetResponse).send({ value: _bounty })
            .on('transactionHash', function (hash) {
                console.log(hash)
            })
    }

    const handleSettleDeal = event => {
        event.preventDefault()
        const dealIdx = parseInt(event.target.value);
        BaseCollude.methods.settleDeal(dealIdx).send()
    }

    const handleRefundDeal = event => {
        event.preventDefault()
        const dealIdx = parseInt(event.target.value);
        BaseCollude.methods.refundDeal(dealIdx).send()
    }

    return (
        <div className="Home">
            <Navbar style={styles.Navbar} expand="md">
                <h1>ETH Collude</h1>
            </Navbar>
            <Container fluid>
                <Row>
                    <Col style={styles.About} xs="6" sm="6">
                        <HomeAbout />
                    </Col>
                    <Col style={styles.Contracts} xs="6" sm="6">
                        <HomeContracts />
                    </Col>
                </Row>
                <Row>
                    <Col style={styles.GetStarted} xs="12" sm="12">
                        <h1>Get Started</h1>
                        <p>
                            Disclosure: Please use responsibly. I recommend initially using
                            Ropsten as creating a bounty costs ETH.
            <br />
                            <br />
                            Create your own collusion contract! Or try triggering some of the
                            contract’s in the “Bounties” section. (Note that bounties are paid
                            to the “beneficiary” address and that there is no reward for
                            triggering a bounty).
          </p>
                        <BountyCreateForm handleCreateDeal={handleCreateDeal} />
                    </Col>
                    <Col style={styles.Bounties} xs="12" sm="12">
                        <h1>Live Bounties</h1>
                        <p>
                            Browse all created bounties. Use the Filter form to select bounties
                            by contract, bounty value, expiry.
          </p>
                        <BountyTable deals={deals} handleSettleDeal={handleSettleDeal} handleRefundDeal={handleRefundDeal} blockNumber={currentBlock.number} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default () => {
    const { useCacheCall, drizzle } = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
        drizzleStatus: drizzleState.drizzleStatus,
        currentBlock: drizzleState.currentBlock,
    }))

    //Update Block
    if (drizzle.web3) {
        const { web3 }  = drizzle;
        web3.eth.getBlockNumber().then((blockNumber) => {
            console.log(`Block ${blockNumber}`)
            return web3.eth.getBlock(blockNumber)
        }).then((block) => {
            drizzle.store.dispatch({type: 'BLOCK_PROCESSING', drizzle, block, web3})
        })
    }

    return (
        <Home
            deals={useCacheCall(['BaseCollude'], call => {
                let dealsCount = useCacheCall('BaseCollude', 'dealsCount');
                if (!dealsCount) { return []; }
                dealsCount = parseInt(dealsCount);
                let deals = [...Array(dealsCount).keys()].map((_, idx) => {
                    const deal = call('BaseCollude', 'deals', idx)
                    return deal;
                })

                return deals || [];
            })}
            currentBlock={drizzleState.currentBlock}
            BaseCollude={drizzle.contracts.BaseCollude} />
    )
}