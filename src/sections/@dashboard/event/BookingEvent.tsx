import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Button, Container, Divider, Typography, styled, RadioGroup, FormControl, FormControlLabel, FormLabel, Radio, Box, Skeleton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import * as AuthenService from "../../../hooks/auth";
import * as Tickets from "../../../hooks/ticket";
import { AuthContext } from '../../../context/AuthContext';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));


export default function BookingForm({ event }) {

    const { _id } = event;
    const navigate = useNavigate();

    const { loading, error, dispatch } = useContext(AuthContext);

    const [quantity, setQuantity] = useState<number>(0);
    const [tickets, setTickets] = useState<Array<any>>([]);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [ticketQuantity, setTicketQuantity] = useState<number>(0);
    const [loadingTickes, setLoadingTickes] = useState(true);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        console.log("Event to booking: ", event);
        setLoadingTickes(true);
        const getData = async () => {
            try {
                const res = await Tickets.getTicketsByEvent({ eventId: _id })
                console.log("🚀 ~ file: BookingEvent.tsx:47 ~ getData ~ res", res)
                setTickets(res.data)
                setLoadingTickes(false);
                setTicketQuantity(0)
            } catch (err) {
                console.log("🚀 ~ file: LoginForm.tsx:37 ~ handleClick ~ err", err)
            }

        }
        getData();
    }, [_id])

    useEffect(() => {
        setTicketQuantity(selectedTicket?.available_quantity || 0)
        setQuantity(0)
    }, [selectedTicket])

    const handleChangeTicket = e => {
        console.log("🚀 ~ file: BookingEvent.tsx:65 ~ handleChangeTicket ~ e", e)
        const selected = tickets.find(t => e.target.defaultValue === t._id)
        console.log("🚀 ~ file: BookingEvent.tsx:66 ~ handleChangeTicket ~ selected", selected)
        if (selected) {
            setSelectedTicket(selected);
        }
    }

    return (
        <>
            <Container maxWidth="sm">
                <StyledContent>
                    <Typography variant="h4" gutterBottom>
                        Booking {event.name}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 5 }}>
                        Don’t have an account? {''}
                        <Link variant="subtitle2">Get started</Link>
                    </Typography>
                    {
                        (!loadingTickes || tickets.length > 0) ?
                            <Stack>
                                <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                                    <FormControl>
                                        <FormLabel id="demo-controlled-radio-buttons-group">Select Ticket</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            onChange={handleChangeTicket}
                                        >
                                            {
                                                tickets.map((t, index) => {
                                                    const ticketLabel = `${t.name} at ${t.description} `
                                                    return <FormControlLabel id={t._id} key={index} value={t._id} control={<Radio />} label={ticketLabel} />
                                                })
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                                <Stack direction="row" spacing={2} sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
                                    <TextField
                                        id="outlined-number"
                                        label="Quality"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled={ticketQuantity === 0}
                                        value={quantity}
                                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                                        onChange={(e) => {
                                            var value = parseInt(e.target.value, 10);

                                            if (value > ticketQuantity) value = ticketQuantity;
                                            if (value < 1) value = 1;

                                            setQuantity(value);
                                        }}
                                    />
                                </Stack>
                                <Stack direction="row" spacing={2} sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="contained" disabled={quantity < 1}>Ok</Button>
                                </Stack>
                            </Stack>
                            :

                            <Box sx={{ width: 300 }}>
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Stack direction="row" spacing={2} sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
                                    <Skeleton animation="wave" height={100} width={200} />
                                </Stack>
                            </Box>
                    }




                </StyledContent>
            </Container>
        </>
    );
}
