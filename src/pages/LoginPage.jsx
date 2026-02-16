import {Box, Button, Field, Fieldset, For, Input, Link, NativeSelect, Show, Stack, Text,} from "@chakra-ui/react"
import {PasswordInput} from "../components/ui/password-input.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {login} from "../api/index.js";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError('Invalid email or password');
        }
    };

    return (
        <Box display="flex"
             alignItems="center"
             justifyContent="center"
             h="vh"
        >
            <Fieldset.Root size="lg"
                           maxW="md"
                           borderRadius="lg"
                           shadow="md"
                           rounded="xl"
                           _hover={{shadow: "xl"}}
                           transition="0.3s"
                           p="6"
                           autoComplete="off"
            >
                <Stack>
                    <Fieldset.Legend align="center">Welcome!</Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Email</Field.Label>
                        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Password</Field.Label>
                        <PasswordInput onChange={e => setPassword(e.target.value)}/>
                    </Field.Root>
                </Fieldset.Content>
                <Show when={error.length > 0}>
                    <Text color="red.solid">{error}</Text>
                </Show>
                <Button bg="teal.solid" type="submit" alignSelf="center" w="80%" onClick={handleSubmit}>
                    Login
                </Button>
                <Text m="0 auto" mt="1rem">Don't have an account?{" "}
                    <Link onClick={() => navigate("/register")}>
                        Sign up
                    </Link>
                </Text>
            </Fieldset.Root>
        </Box>
    )
}

export default LoginPage;