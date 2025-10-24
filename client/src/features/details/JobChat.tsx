import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  InputBase,
  Stack,
  Paper,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import { hash_mod_100 } from "../../lib/util/util";
import { jobSchema, type JobSchema } from "../../lib/schemas/jobSchema";
import useJobs from "../../lib/hooks/useJobs";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


type Msg = {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  time: string;
  mine?: boolean;
  asking?: boolean;
  questionRef?: string;
};

export default function ActivityDetailsChat() {
  const { id } = useParams();
  const { reset } = useForm<JobSchema>({
    mode: "onTouched",
    resolver: zodResolver(jobSchema),
  });
  const navigate = useNavigate();


  const { createJob, job } = useJobs(id);
  useEffect(() => {
    if (job) {
      reset({
        ...job,
      });
    }
  }, [job, reset]);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>(
    [
      {
        id: "1",
        author: "ChatBot",
        avatar: "/images/user.png",
        text: "Ask me anything! ",
        time: "Now",
        asking: false,
      },

      {
        id: "2",
        author: "You",
        avatar: "/images/user.png",
        text: "Hello",
        time: "Now",
        mine: true,
      },
    ]
  );

  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // algorithms
  type Alg = { text: string; fn: (q: string) => string };
  const algList: Alg[] = [
    { text: "Always 42", fn: () => "42" },
    { text: "Hash % 100", fn: (q) => hash_mod_100(q).toString() },
    { text: "Echo", fn: (q) => `Echo: ${q}` },
  ];

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = {
      id: Date.now().toString(),
      author: "You",
      avatar: "/images/user.png",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      mine: true,
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");

    const askMsg: Msg = {
      id: `ask-${Date.now().toString()}`,
      author: "ChatBot",
      avatar: "/images/user.png",
      text: "Which algorithm should I use?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      asking: true,
      questionRef: userMsg.id,
    };

    setMessages((m) => [...m, askMsg]);
  };

  const runAlg = async (alg: Alg, questionId: string) => {
    if (loading) return;
    const questionMsg = messages.find((x) => x.id === questionId);
    const questionText = questionMsg?.text ?? "";
    if (!questionText) return;

    setLoading(true);

    const delay = Math.floor(Math.random() * 4000) + 1000;
    await new Promise((r) => setTimeout(r, delay));

    const answer = alg.fn(questionText);

    const payload = {
      timestamp: new Date().toISOString(),
      question: questionText,
      algorithm: alg.text,
      answer: answer,
    };

    try {
      if (createJob.mutateAsync) {
        await createJob.mutateAsync(payload);
      } else {
        await new Promise<void>((resolve, reject) =>
          createJob.mutate(payload, { onSuccess: () => resolve(), onError: (e) => reject(e) })
        );
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.questionRef === questionId && m.asking ? { ...m, asking: false, text: `Using ${alg.text}...` } : m
        )
      );

      const botAnswer: Msg = {
        id: Date.now().toString(),
        author: "ChatBot",
        avatar: "/images/user.png",
        text: answer,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((m) => [...m, botAnswer]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          id: Date.now().toString(),
          author: "System",
          text: "Failed to run algorithm or save job",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          background: "linear-gradient(90deg, #262626ff 0%, #848484ff 100%)",
          color: "white",
          borderRadius: 3,
          px: 2.5,
          py: 0.6,
          boxShadow: "0 6px 18px rgba(59, 59, 59, 0.16)",
          textTransform: "none",
          fontWeight: 700,
          transition: "transform 120ms ease, box-shadow 120ms ease",
          "&:hover": {
            boxShadow: "0 10px 28px rgba(41,182,246,0.22)",
            transform: "translateY(-2px)",
            background: "linear-gradient(90deg, #959595ff 0%, #303030ff 100%)",
          },
        }}
      >
        Go Back
      </Button>
      <Box
        sx={{
          textAlign: "center",
          background:
            "linear-gradient(90deg, rgba(123,97,255,0.12), rgba(41,182,246,0.08))",
          color: "text.primary",
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          py: 1.5,
          mt: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
          Chat with me
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          I will ask which algorithm to use and then reply.
        </Typography>
      </Box>

      <Card sx={{ mt: 2, borderRadius: 3, boxShadow: 6, overflow: "hidden" }}>
        <CardContent sx={{ p: 0 }}>
          <Box
            ref={listRef}
            sx={{
              maxHeight: 320,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "background.paper",
            }}
          >
            {messages.map((m, i) => (
              <Box
                key={m.id}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  alignItems: "flex-start",
                  justifyContent: m.mine ? "flex-end" : "flex-start",
                  animation: `pop 360ms ease ${i * 40}ms both`,
                }}
              >
                {!m.mine && (
                  <Avatar
                    src={m.avatar}
                    alt={m.author}
                    sx={{ width: 36, height: 36 }}
                  />
                )}

                <Box
                  sx={{
                    maxWidth: "78%",
                    bgcolor: m.mine ? "#8b8b8bff" : "grey.100",
                    color: m.mine ? "common.white" : "text.primary",
                    px: 2.2,
                    py: 1.1,
                    borderRadius: 2,
                    overflowWrap: "anywhere",
                    textAlign: "left",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {m.mine ? "You" : m.author}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {m.time}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, whiteSpace: "pre-wrap" }}
                  >
                    {/* {m.text} */}
                    {loading ? "Thinking..." : m.text}
                  </Typography>

                  {m.asking && m.questionRef && (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: 1, flexWrap: "wrap" }}
                    >
                      {algList.map((alg) => (
                        <Button
                          key={alg.text}
                          size="small"
                          variant="outlined"
                          onClick={() => runAlg(alg, m.questionRef!)}
                          disabled={loading}
                        >
                          {alg.text}
                        </Button>
                      ))}
                    </Stack>
                  )}
                </Box>

                {m.mine && (
                  <Avatar
                    src={m.avatar}
                    alt={m.author}
                    sx={{ width: 36, height: 36 }}
                  />
                )}
              </Box>
            ))}
          </Box>

          <Divider />

          <Box sx={{ p: 2, display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar
              src={"/images/user.png"}
              alt={"you"}
              sx={{ width: 40, height: 40 }}
            />

            <Paper
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              sx={{
                p: "6px 8px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                flex: 1,
                borderRadius: 3,
                boxShadow: "none",
                bgcolor: "background.default",
              }}
            >
              <InputBase
                multiline
                maxRows={4}
                placeholder="Write a message — Enter to send, Shift+Enter for newline"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                sx={{ flex: 1, ml: 1 }}
              />
              <IconButton
                type="submit"
                color="primary"
                sx={{ p: 1 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <SendIcon sx={{ color: "gray" }} />
                )}
              </IconButton>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
