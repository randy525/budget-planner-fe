import { useState } from "react";
import {Box, Button, Input, Stack, Text, Show, Link} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Fieldset, Field } from "@chakra-ui/react";
import {PasswordInput} from "../components/ui/password-input.jsx";
import {register} from "../api/index.js";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const data = await register(email, name, password);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Registration failed. Try again.");
        }
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
            <Fieldset.Root
                size="lg"
                maxW="md"
                borderRadius="lg"
                shadow="md"
                rounded="xl"
                _hover={{shadow: "xl"}}
                transition="0.3s"
                p="6"
            >
                <Stack>
                    <Fieldset.Legend align="center">Create an account</Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Email</Field.Label>
                        <Input
                            colorPalette="teal"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Input
                            colorPalette="teal"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Password</Field.Label>
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Confirm Password</Field.Label>
                        <PasswordInput
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Field.Root>
                </Fieldset.Content>
                <Show when={error.length > 0}>
                    <Text color="red.solid">{error}</Text>
                </Show>
                <Button
                    bg="teal.solid"
                    type="submit"
                    alignSelf="center"
                    w="80%"
                    onClick={handleSubmit}
                >
                    Register
                </Button>
                <Text m="0 auto" mt="1rem">Already have an account?{" "}
                    <Link onClick={() => navigate("/login")}>
                        Log in
                    </Link>
                </Text>
            </Fieldset.Root>
        </Box>
    );
}

export default RegisterPage;
